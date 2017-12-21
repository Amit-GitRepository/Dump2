#!/bin/bash

# THIS FILE IS USED TO RUN THE APP IN EMULATOR (NOT BUILD)
set -e
cur_dir=`dirname $0`
source $cur_dir/../utility.sh
bash $cur_dir/../setup.sh &&
setEnvFromFile $ENVFILE
rndebugger-open --open &&
react-native run-ios --scheme $IOS_SCHEME #IOS_SCHEME comes from .env file
