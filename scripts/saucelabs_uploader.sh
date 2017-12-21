#!/bin/bash
set -e
cur_dir=`dirname $0`
source $cur_dir/../scripts/utility.sh

setEnvFromFile $ENVFILE

# IOS
# app path: ./ios/build/Build/Products/Release-iphonesimulator/iService.app
# zipping cmd: zip -r iService.zip ./ios/build/Build/Products/Release-iphonesimulator/iService.app

# ANDROID
# app path: ./android/app/build/outputs/apk/app-release.apk

# Upload cmd: curl -u <username>:<apiKey></username></username> -X POST -H "Content-Type: application/octet-stream" https://saucelabs.com/rest/v1/storage/<username>/iservice.zip?overwrite=true --data-binary @<file_path>


# build only in AUTOMATION_BUILD_BRANCH branch
if [[ "$AUTOMATION_BUILD_BRANCH" == *"$CIRCLE_BRANCH"* ]]; then

  readIfNotExist SAUCE_USERNAME $SAUCE_USERNAME
  readIfNotExist SAUCE_KEY $SAUCE_KEY
  readIfNotExist IOS_SCHEME $IOS_SCHEME
  readIfNotExist BUILD_PLATFORM $BUILD_PLATFORM
  readIfNotExist IOS_CONFIGURATION $IOS_CONFIGURATION

  echo "-------------Uploading to saucelabs for ${BUILD_PLATFORM}---------------"

  if [[ "$BUILD_PLATFORM" == "IOS" ]]; then
    echo "\nBuilding app file for simulator(for saucelabs)\n"
    xcodebuild -workspace $cur_dir/../ios/iService.xcworkspace -scheme $IOS_SCHEME -derivedDataPath $cur_dir/../ios/build -sdk iphonesimulator -configuration $IOS_CONFIGURATION build
    cd ./ios/build/Build/Products/Release-iphonesimulator
    echo "\n Zipping the app file... \n"
    zip -r iService.zip "./$IOS_SCHEME.app"
    APP_PATH="./iService.zip"
    APP_FILENAME="iService.zip"
  fi


  if [[ "$BUILD_PLATFORM" == "ANDROID" ]]; then
    APP_PATH="./android/app/build/outputs/apk/app-release.apk"
    APP_FILENAME="iService.apk"
  fi

  echo "\n App Ready! Uploading $APP_PATH file to saucelabs..\n"
  curl -u $SAUCE_USERNAME:$SAUCE_KEY -X POST -H "Content-Type: application/octet-stream" "https://saucelabs.com/rest/v1/storage/$SAUCE_USERNAME/$APP_FILENAME?overwrite=true" --data-binary @$APP_PATH
else
  echo "\nSkipping upload, branch name: $CIRCLE_BRANCH\n"
fi
