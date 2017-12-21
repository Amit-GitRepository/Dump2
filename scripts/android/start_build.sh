#!/bin/bash

set -e
cur_dir=`dirname $0`
#importing utility file
source $cur_dir/../utility.sh
bash $cur_dir/../setup.sh

# Setting the environment variables from the .env file
setEnvFromFile $ENVFILE

echo "ENV is $ENV_NAME and DEVICE is ANDROID";

# CHECK IF NOT SET OTHERWISE ASK
# These are generally set in .env files
readIfNotExist ANDROID_KEYSTORE_FILE $ANDROID_KEYSTORE_FILE
readIfNotExist ANDROID_KEY_ALIAS $ANDROID_KEY_ALIAS
readIfNotExist ANDROID_APP_ID $ANDROID_APP_ID
# These need to be passed or will be asked
readIfNotExist BUILD_NUMBER $BUILD_NUMBER
readIfNotExist BUILD_NAME $BUILD_NAME
readIfNotExist DECRYPT_PASSWORD $DECRYPT_PASSWORD
readIfNotExist ANDROID_KEYSTORE_PASSWORD $ANDROID_KEYSTORE_PASSWORD
readIfNotExist ANDROID_KEY_PASSWORD $ANDROID_KEY_PASSWORD
# IF EVERYTHING IS FINE DO THE BUILD
echo "EVERYTHING LOOKS FINE.. LETS BUILD AND SIGN 😎"

bash $cur_dir/decrypt.sh &&
bash $cur_dir/builder.sh &&
bash $cur_dir/cleanup.sh
