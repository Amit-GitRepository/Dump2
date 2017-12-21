#!/bin/bash

set +e
cur_dir=`dirname $0`

echo "REMOVING SENSITIVE FILES"
security default-keychain -s login.keychain
security delete-keychain ios-build.keychain
rm ~/Library/MobileDevice/Provisioning\ Profiles/$IOS_PROVISION_PROFILE

echo "CLEANING UP ENVIRONEMT VARIABLES 🔍"
unset DEVICE
unset ENV
unset ENVFILE
unset IOS_PROVISION_PROFILE
unset IOS_APP_ID
unset IOS_EXPORT_OPTIONS_PLIST
