#!/bin/bash
set -e
cur_dir=`dirname $0`
#importing utility file
source $cur_dir/utility.sh

readIfNotExist DECRYPT_PASSWORD $DECRYPT_PASSWORD

echo "Updating encrypted Environments"
openssl aes-256-cbc -in $cur_dir/../config/.env -out $cur_dir/../config/encrypted/.env.enc -a -pass env:DECRYPT_PASSWORD
openssl aes-256-cbc -in $cur_dir/../config/.env.test -out $cur_dir/../config/encrypted/.env.test.enc -a -pass env:DECRYPT_PASSWORD
openssl aes-256-cbc -in $cur_dir/../config/.env.alpha -out $cur_dir/../config/encrypted/.env.alpha.enc -a -pass env:DECRYPT_PASSWORD
openssl aes-256-cbc -in $cur_dir/../config/.env.prod -out $cur_dir/../config/encrypted/.env.prod.enc -a -pass env:DECRYPT_PASSWORD
