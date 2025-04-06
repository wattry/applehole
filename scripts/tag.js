#!/usr/bin/env node

import fs from 'node:fs';
import axios from 'axios';
import { spawnSync } from 'node:child_process';

const instance = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}`,
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

async function getLatestRelease() {
  try {
    const { data } = await instance.get('/releases/latest');

    return data.tag_name
  } catch (error) {
    if (error?.response?.status === 404) {
      return null
    } else {
      throw error
    }
  }
}

function runSpawn(cmd, args) {
  const { stderr, status, stdout } = spawnSync(cmd, args);

  const error = stderr?.toString();
  if (status && status > 0 && error) {

    console.error(error, ':', cmd, args.join(' '));
    throw new Error(error);
  }
}

async function action() {
  try {
    const [_, __, currentTag] = process.argv;
    // const currentRelease = await getLatestRelease();
    const packageJSON = fs.readFileSync(`${process.env.PWD}/package.json`);
    /** @type {{ version: string; }} */
    const packageJS = JSON.parse(packageJSON);

    const packageJsRelease = packageJS.version;
    const release = {
      tag: `v${packageJsRelease}`
    };
    const message = process.env.CONVENTIONAL_COMMIT;
    
    if (currentTag && currentTag === release.tag) {
      const [major, minor, patch] = version.split('.');

      let majorVersion = parseInt(major);
      let minorVersion = parseInt(minor);
      let patchVersion = parseInt(patch);
      /** @type {string} */

      if (message.contains('!') || message.toLowerCase().contains('breaking')) {
        majorVersion += 1;
      } else if (message.contains('feat')) {
        minorVersion += 1;
      } else if (message.contains('fix')) {
        patchVersion += 1
      }

      packageJS.version = `${majorVersion}.${minorVersion}.${patchVersion}`;
      release.tag = `${packageJS.version}`;

      fs.writeFileSync(`${PWD}/package.json`, JSON.stringify(packageJS));

      runSpawn('git', ['add', `${PWD}/package.json`]);
      runSpawn('git', ['commit', '-m', message]);
      runSpawn('git', ['push']);
    }

    console.debug('Creating tag');
    runSpawn('git', ['tag', '-a', release.tag, '-m', `Release ${release.tag}`]);
    console.debug('Created tag');

    console.debug('Push release');
    runSpawn('git', ['push', 'origin', release.tag]);
    console.debug('Pushed release');
  } catch (error) {
    console.log(error.message, error.stack);
    process.exit(1);
  }
}

action();