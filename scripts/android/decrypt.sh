#!/bin/bash

set -e
cur_dir=`dirname $0`

echo "DECRYPTING $ANDROID_KEYSTORE_FILE"
openssl aes-256-cbc -k $DECRYPT_PASSWORD -in $cur_dir/keystores/$ANDROID_KEYSTORE_FILE.enc -d -a -out $cur_dir/../../android/app/$ANDROID_KEYSTORE_FILE
