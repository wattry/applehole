#!/bin/bash
set -e

if node --version >/dev/null; then
  bin_dir="$(dirname $0)"
  node "${PWD}/${bin_dir}/index.mjs" "$bin_dir"
else
  echo "Please install NodeJS"
  open "https://nodejs.org/en/download"
fi
