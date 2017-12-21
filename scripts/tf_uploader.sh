#!/bin/sh
set -e
cur_dir=`dirname $0`
# This upload script is both for iOS and Android.

UPLOADER_VERSION=2.12
# Put your TestFairy API_KEY here. Find it here: https://app.testfairy.com/settings/#tab-api-key
TESTFAIRY_UPLOAD_KEY=$TESTFAIRY_UPLOAD_KEY
VERSION_DETAIL="$BUILD_NAME $BUILD_NUMBER"
BUILD_PLATFORM=$1

if [[ "$BUILD_PLATFORM" == "ANDROID" ]]; then
	APP_FILENAME="$cur_dir/../android/app/build/outputs/apk/app-release.apk";
fi

if [[ "$BUILD_PLATFORM" == "IOS" ]]; then
	APP_FILENAME="$cur_dir/../ios/build/Products/IPA/iService.ipa";
fi
# Tester Groups that will be notified when the app is ready. Setup groups in your TestFairy account testers page.
# This parameter is optional, leave empty if not required
TESTER_GROUPS="McKinSey"

# Should email testers about new version. Set to "off" to disable email notifications.
NOTIFY="on"

# If AUTO_UPDATE is "on" all users will be prompt to update to this build next time they run the app
AUTO_UPDATE="on"

# The maximum recording duration for every test.
MAX_DURATION="10m"

# Is video recording enabled for this build. valid values:  "on", "off", "wifi"
VIDEO="wifi"

# Comment text will be included in the email sent to testers
COMMENT="$DEVICE build. $VERSION_DETAIL"

# locations of various tools
CURL=curl

SERVER_ENDPOINT=https://upload.testfairy.com

usage() {
	echo "Usage: tf_uploader.sh ANDROID for Android \n tf_uploader.sh IOS for IOS"
}

verify_tools() {

	# Windows users: this script requires curl. If not installed please get from http://cygwin.com/

	# Check 'curl' tool
	"${CURL}" --help >/dev/null
	if [ $? -ne 0 ]; then
		echo "Could not run curl tool, please check settings"
		exit 1
	fi
}

verify_settings() {
	if [ -z "${TESTFAIRY_UPLOAD_KEY}" ]; then
		usage
		echo "Please set TESTFAIRY_UPLOAD_KEY as your env variable with your private API key, as noted in the Settings page"
		exit 1
	fi
	if [ -z "${BUILD_PLATFORM}" ]; then
		usage
		echo "Please mention the platform to build"
		exit 1
	fi
}

if [ $# -ne 1 ]; then
	usage
	exit 1
fi

# before even going on, make sure all tools work
verify_tools
verify_settings


if [ ! -f "${APP_FILENAME}" ]; then
	usage
	echo "Can't find file: ${APP_FILENAME}"
	exit 2
fi

# temporary file paths
DATE=`date`

/bin/echo -n "Uploading ${APP_FILENAME} to TestFairy.. "
JSON=$( "${CURL}" -s ${SERVER_ENDPOINT}/api/upload -F api_key=${TESTFAIRY_UPLOAD_KEY} -F file="@${APP_FILENAME}" -F video="${VIDEO}" -F max-duration="${MAX_DURATION}" -F comment="${COMMENT}" -F testers-groups="${TESTER_GROUPS}" -F auto-update="${AUTO_UPDATE}" -F notify="${NOTIFY}" -F instrumentation="off" -A "TestFairy Command Line Uploader ${UPLOADER_VERSION}" )

URL=$( echo ${JSON} | sed 's/\\\//\//g' | sed -n 's/.*"build_url"\s*:\s*"\([^"]*\)".*/\1/p' )
if [ -z "$URL" ]; then
	echo "FAILED!"
	echo
	echo "Build uploaded, but no reply from server. Please contact support@testfairy.com"
	exit 1
fi

echo "OK!"
echo
echo "Build was successfully uploaded to TestFairy and is available at:"
echo ${URL}
