#!/usr/bin/env node

import fs from 'node:fs';
import axios from 'axios';

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28'
};
const instance = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}`,
  headers
});

const uploadInstance = axios.create({
  baseURL: `https://uploads.github.com/repos/${process.env.GITHUB_REPOSITORY}`,
  headers
});

async function createRelease(tag, chipSet) {
  const {
    data: { id, upload_url }
  } = await instance.post(
    '/releases',
    {
      owner: process.env.GITHUB_REPOSITORY_OWNER,
      repo: process.env.GITHUB_REPOSITORY,
      tag_name: tag,
      target_commitish: 'main',
      draft: false,
      generate_release_notes: true
    }
    );
  console.log('upload_url', upload_url)

  const results = await Promise.allSettled([
    uploadInstance.post(
      `/releases/${id}/assets?name=AppleHole.dmg&label=AppleHole-${tag}.${chipSet}.dmg`,
      fs.createReadStream(`${process.env.PWD}/assets/AppleHole-${tag}.dmg`),
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': fs.statSync(`${process.env.PWD}/assets/AppleHole-${tag}.dmg`).size
        }
      }
    ),
    uploadInstance.post(
      `/releases/${id}/assets?name=AppleHole.sh&label=AppleHole-${tag}.sh`,
      fs.createReadStream(`${process.env.PWD}/scripts/AppleHole`),
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': fs.statSync(`${process.env.PWD}/scripts/AppleHole`).size
        }
      }
    )
  ]);

  results.forEach((result) => {
    if (result?.reason) {
      console.error('Failed to update assets', result?.reason?.message);
    } else {
      console.log(JSON.stringify(result.value.data));
    }
  });
}

async function action() {
  try {
    const [_, __, tag, chipSet] = process.argv;

    await createRelease(tag, chipSet);
  } catch (error) {
    console.error(error.stack, error?.response?.data);
  }
}

await action();