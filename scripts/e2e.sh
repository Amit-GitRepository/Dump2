# set -e
# cur_dir=`dirname $0`
# WORKING_DIR=`pwd`;
#
# # build only in AUTOMATION_BUILD_BRANCH branch
# if [[ "$AUTOMATION_BUILD_BRANCH" == *"$CIRCLE_BRANCH"* ]]; then
#   # Go back from the current dir
#   cd ..
#
#   git clone truedmp@bitbucket.org:truedmp/iservice-app-automation.git
#
#   # cd to automation dir
#   cd iservice-app-automation
#
#   # mvn install will trigger test and wait for saucelabs completion
#   mvn clean install
# else
#   echo "\nSkipping e2e tests, branch name: $CIRCLE_BRANCH\n"
# fi
