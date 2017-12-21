#!/bin/bash

set -e
cur_dir=`dirname $0`
#importing utility file
source $cur_dir/utility.sh

readIfNotExist DECRYPT_PASSWORD $DECRYPT_PASSWORD

echo "Decrypting Environments"
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/../config/encrypted/.env.enc -d -a -out $cur_dir/../config/.env
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/../config/encrypted/.env.test.enc -d -a -out $cur_dir/../config/.env.test
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/../config/encrypted/.env.alpha.enc -d -a -out $cur_dir/../config/.env.alpha
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/../config/encrypted/.env.prod.enc -d -a -out $cur_dir/../config/.env.prod

#Setting variables from the envfile
setEnvFromFile $ENVFILE
echo "Environment: $ENV_NAME"

#Decrypt files
echo "Decrypting google-services.json"
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/../config/encrypted/google-services.json.enc -d -a -out $cur_dir/../android/app/google-services.json

echo "Decrypting GoogleService-Info.plist.enc"
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/../config/encrypted/$GOOGLESERVICE_INFO_PLIST -d -a -out $cur_dir/../ios/iService/GoogleService-Info.plist
