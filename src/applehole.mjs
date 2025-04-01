#!/bin/bash

import child from 'node:child_process'

let started = 0;

// Start a child process to watch the log for Apple Music to launch
const log = child.spawn(
  'log',
  ['stream', '--predicate', 'eventMessage contains "Launch request for app<application.com.apple.Music"', '--style', 'json'],
  { serialization: 'json' }
);

const pgrepOnData = (data) => {
  const process = data.toString().trim();

  // If there is a process kill it.
  if (process) {
    child.spawnSync('kill', [process])
  }
};

// When a launch event is detected get the process id
const logData = () => {
  // Increment the initial output as it's just the listener starting.
  if (started) {
    // Wait 100ms in case it hasn't started yet.
    setTimeout(() => {
      const pgrep = child.spawn('pgrep', ['Music']);

      pgrep.stdout.on('data', pgrepOnData);
    }, 100)
  } else {
    started += 1;
  }
};

log.stdout.on('data', logData);
