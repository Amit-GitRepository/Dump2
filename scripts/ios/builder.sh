#!/bin/bash

set -e
cur_dir=`dirname $0`

WORKING_DIR=`pwd`;
cd $cur_dir/../../ios
echo "Setting version to ${BUILD_NUMBER}, ${BUILD_NAME}"
xcrun agvtool new-version -all ${BUILD_NUMBER}
xcrun agvtool new-marketing-version ${BUILD_NAME}
cd $WORKING_DIR

echo "Archiving the project"
xcodebuild archive -workspace $cur_dir/../../ios/iService.xcworkspace -scheme $IOS_SCHEME -configuration $IOS_CONFIGURATION -derivedDataPath $cur_dir/../../ios/build -archivePath $cur_dir/../../ios/build/Products/$IOS_SCHEME.xcarchive

#SIGN
# Issue : "No applicable devices found."
# Fix: https://stackoverflow.com/questions/39634404/xcodebuild-exportarchive-no-applicable-devices-found
unset GEM_HOME
unset GEM_PATH

echo "Export archive to create IPA file using $IOS_EXPORT_OPTIONS_PLIST"
xcodebuild -exportArchive -archivePath $cur_dir/../../ios/build/Products/$IOS_SCHEME.xcarchive -exportOptionsPlist $cur_dir/../../scripts/ios/exportOptions/$IOS_EXPORT_OPTIONS_PLIST -exportPath $cur_dir/../../ios/build/Products/IPA

cp "$cur_dir/../../ios/build/Products/IPA/$IOS_SCHEME.ipa" "$cur_dir/../../ios/build/Products/IPA/iService.ipa"
