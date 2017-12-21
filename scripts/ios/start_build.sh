#!/bin/bash

set -e
cur_dir=`dirname $0`
#importing utility file
source $cur_dir/../utility.sh

bash $cur_dir/../setup.sh &&

# Setting the environment variables from the .env file
setEnvFromFile $ENVFILE

echo "ENV is $ENV_NAME and DEVICE is IOS";

# CHECK IF NOT SET OTHERWISE ASK
# These are generally set in .env files
readIfNotExist IOS_PROVISION_PROFILE $IOS_PROVISION_PROFILE
readIfNotExist IOS_CERTIFICATE $IOS_CERTIFICATE
readIfNotExist IOS_APP_ID $IOS_APP_ID
readIfNotExist IOS_EXPORT_OPTIONS_PLIST $IOS_EXPORT_OPTIONS_PLIST
readIfNotExist IOS_SCHEME $IOS_SCHEME
readIfNotExist IOS_CONFIGURATION $IOS_CONFIGURATION

# These need to be passed or will be asked
readIfNotExist BUILD_NUMBER $BUILD_NUMBER
readIfNotExist BUILD_NAME $BUILD_NAME
readIfNotExist DECRYPT_PASSWORD $DECRYPT_PASSWORD
readIfNotExist IOS_CERTIFICATE_KEY $IOS_CERTIFICATE_KEY
# IF EVERYTHING IS FINE DO THE BUILD
echo "EVERYTHING LOOKS FINE.. LETS ARCHIVE AND SIGN 😎"

bash $cur_dir/decrypt.sh &&
bash $cur_dir/keychain.sh &&
bash $cur_dir/builder.sh &&
bash $cur_dir/cleanup.sh
