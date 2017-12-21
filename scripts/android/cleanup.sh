#!/bin/bash

set +e
cur_dir=`dirname $0`

echo "CLEANING UP ENVIRONEMT VARIABLES 🔍"
unset DEVICE
unset ENV
unset ENVFILE
unset ANDROID_KEYSTORE_FILE
unset ANDROID_KEY_ALIAS
unset ANDROID_APP_ID
unset BUILD_NUMBER
unset BUILD_NAME
unset ANDROID_KEYSTORE_PASSWORD
unset ANDROID_KEY_PASSWORD
unset DECRYPT_PASSWORD

echo "REMOVING SENSITIVE FILES"
rm -rf $cur_dir/../../android/app/*.keystore
