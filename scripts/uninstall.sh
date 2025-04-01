#!/bin/bash
set -e

SERVICE_NAME="com.user.ahole"
rm /Users/wattry/Library/LaunchAgents/com.user.applehole.plist

launchctl stop "$SERVICE_NAME"
launchctl unload "$SERVICE_NAME"
launchctl remove "$SERVICE_NAME"
