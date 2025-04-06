#!/bin/bash

# Throw on all errors
set -e

RELEASE_TAG="$1"

# Set the location of the source to build the dmg
DMG_BUILD_PATH="${PWD}/AppleHole.app/Contents" 
# Set the path to generate the dmg file to distribute.
DMG_PATH="${PWD}/assets/AppleHole-${RELEASE_TAG}.dmg"

# Clear out all generated assets
/bin/bash "${PWD}/scripts/cleanup.sh"

# Copy the source and assets to the dmg source build directory
if [[ ! -d "${DMG_BUILD_PATH}/MacOs" ]]; then
  mkdir "${DMG_BUILD_PATH}/MacOs"
fi

if [[ ! -d "${DMG_BUILD_PATH}/Resources" ]]; then
  mkdir "${DMG_BUILD_PATH}/Resources"
fi

if [[ ! -d "${PWD}/assets" ]]; then
  mkdir "${PWD}/assets"
fi

cp "${PWD}/scripts/AppleHole" "${DMG_BUILD_PATH}/MacOs/AppleHole"
cp "${PWD}/scripts/install" "${DMG_BUILD_PATH}/Resources/"
cp "${PWD}/scripts/uninstall" "${DMG_BUILD_PATH}/Resources/"
cp "${PWD}/config/com.user.applehole.daemon.plist" "${DMG_BUILD_PATH}/Resources/uninstall"

# Create the icons
/bin/bash "${PWD}/scripts/icons.sh"
# Build the dmg
appdmg --verbose "${PWD}/appdmg.json" "$DMG_PATH"

