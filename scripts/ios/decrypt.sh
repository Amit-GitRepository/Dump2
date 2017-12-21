#!/bin/bash

set -e
cur_dir=`dirname $0`

echo "Decrypting $IOS_PROVISION_PROFILE"
openssl aes-256-cbc -k "$DECRYPT_PASSWORD" -in $cur_dir/profile/$IOS_PROVISION_PROFILE.enc -d -a -out $cur_dir/profile/$IOS_PROVISION_PROFILE

echo "Decrypting $IOS_CERTIFICATE"
openssl aes-256-cbc -k "$DECRYPT_PASSWORD" -in $cur_dir/certs/$IOS_CERTIFICATE.enc -d -a -out $cur_dir/certs/$IOS_CERTIFICATE
