#!/usr/bin/env node

import path from 'node:path';
import sharp from 'sharp';

const cwd = process.cwd();
const baseImagePath = path.join(cwd, '/applehole.webp');
const assetPath = path.join(cwd, '/images');
const baseImage = sharp(baseImagePath);

async function getAllSized() {
  const options = { palette: true, effort: 10 };

  try {
    const resized = baseImage.resize({
      height: 1024,
      height: 1024
    })
    
    await Promise.allSettled([
      resized
        .png(options)
        .toFile(path.join(assetPath, `applehole-Light-1024x1024.png`)),
      resized
        .clone()
        .negate()
        .png(options)
        .toFile(path.join(assetPath, `applehole-Dark-1024x1024.png`))
    ]);
  } catch (error) {
    console.log(error.message, error.stack)
  }
}

await getAllSized();
