#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import childProcess from 'child_process';

const user = os.userInfo()
const PLIST = 'com.user.applehole.plist';
const APP = 'applehole.mjs';
const LAUNCH_PLIST_PATH = path.join(user.homedir, '/Library/LaunchAgents', PLIST)
const CWD = process.cwd();
const NODE_PATH = process.argv[0];
const INSTALL_BASE = process.argv[2];
const APP_PATH = path.join(CWD, INSTALL_BASE, APP);
const PLIST_PATH = path.join(CWD, INSTALL_BASE, PLIST);
const PLIST_TEMPLATE = fs.readFileSync(PLIST_PATH, 'utf-8')

const PLIST_FILE = PLIST_TEMPLATE
  .replace('$NODE_PATH', NODE_PATH)
  .replace('$APP_PATH', APP_PATH);

try {
  if (fs.existsSync(LAUNCH_PLIST_PATH)) {
    fs.rmSync(LAUNCH_PLIST_PATH, { force: true });
  }

  fs.writeFileSync(LAUNCH_PLIST_PATH, PLIST_FILE, { mode: 0o666 });
  
  const child = childProcess.spawnSync('sudo', ['launchctl', 'bootstrap', `gui/${user.uid}`, LAUNCH_PLIST_PATH]);

  if (child.stdout) {
    console.log(child.stdout.toString());
  }
} catch (error) {
  console.error('An error occurred installing applehole', error.message, error.stack);
}
