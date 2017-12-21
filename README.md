# iService-Mobile
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/99e6ddae225c498c9eae7a5a5f555c2d)](https://www.codacy.com?utm_source=git@bitbucket.org&amp;utm_medium=referral&amp;utm_content=truedmp/iservice-app&amp;utm_campaign=Badge_Grade)

[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/99e6ddae225c498c9eae7a5a5f555c2d)](https://www.codacy.com?utm_source=git@bitbucket.org&utm_medium=referral&utm_content=truedmp/iservice-app&utm_campaign=Badge_Coverage)

[![CircleCI](https://circleci.com/bb/truedmp/iservice-app.svg?style=svg)](https://circleci.com/bb/truedmp/iservice-app)

## Instructions
#### Node version 8.1.4
#### Running the code
1. `git clone https://<username>@bitbucket.org/truedmp/iservice-app.git`
2. 'yarn'
3. Install [react-native-debugger](https://github.com/jhen0409/react-native-debugger)

#### For Android:
In a separate tab
1. `cd <Android SDK path>/tools/ && ./emulator`
2. Start emulator `emulator @<AVD name>` - keep this running, AVD name is as created from AVD Manager

In project
1. `yarn android`

#### For IOS:
1. 'yarn ios'


#### DECRYPT_PASSWORD
You might be asked to enter DECRYPT_PASSWORD when launching the app. This password is required to decrypt the sensitive files present in the repo.

The password is located in the box note here:
`https://mckinsey.ent.box.com/notes/217375290270`

**If you want to avoid entering DECRYPT_PASSWORD everytime you launch the app**, just add the following to you `~/.zshrc` or `~/.bashrc`:

```
export DECRYPT_PASSWORD=<PASSWORD>
```
After this open up a new terminal and try. The DECRYPT_PASSWORD will be automatically read.

#### Available scripts
```
"start": Launches the React Native Packager on port 8081.
"test": Runs the test and shows the coverage in terminal.
"test:update": Runs the test and updates snapshots.
"test:watch": Runs the test in watch mode.
"coverage": Generates the coverage and opens it in the default browser.
"env:update":"re-encrypts/updates the .env and .env.prod files to the encrypted folder",
"lint": Runs the eslint on app folder.
"prepush": Script meant to be run before every push to Bitbucket/Github.
"postinstall": Script meant to install prepush hooks via husky.
"android": Runs the cleaned android project on emulator or connected device with Local/Dev environment in DEBUG mode.
"android:alpha": Runs the cleaned android project on emulator or connected device with Alpha environment in DEBUG mode.
"android:prod": Runs the cleaned android project on emulator or connected device with Prod environment in DEBUG mode.
"ios": Runs the ios project on emulator with Local/Dev environment in DEBUG mode.
"ios:alpha": Runs the ios project on emulator with Alpha environment in DEBUG mode.
"ios:prod": Runs the ios project on emulator with Prod environment in DEBUG mode.
"build:android:dev": Builds the apk by setting Dev environment.
"build:android:alpha": Builds the apk by setting Alpha environment.
"build:android:prod":  Builds the apk by setting Prod environment.
"build:ios:dev":  Builds the ios ipa by setting Dev environment.
"build:ios:alpha":  Builds the ios ipa by setting Alpha environment.
"build:ios:prod":  Builds the ios ipa by setting Prod environment.
```

### UPDATING Encrypted environments

Make changes to the `config/.env` and `config/.env.prod` files
and then run `yarn env:update`

### Android SDK installation and configuration
- https://developer.android.com/studio/index.html download Android studio
- Steps for installation : https://developer.android.com/studio/install.html
- After installation, open Android Studio -> Preferences -> Appearance & Behavior -> System Settings -> Android SDK

In SDK Platforms tab:
Select option Show Package Details.

Then select following packages to install:
```
- android-23 (Android 6.0 -> Android SDK Platform 23)
- addon-google_apis-google-23 (Android 6.0 -> Google APIs, Android 23)
```

Switch to SDK Tools tab.
Select option Show Package Details.
Then select following packages to install:
```
- build-tools-23.0.1 (Android SDK Build-Tools -> 23.0.1)
- extra-google-google_play_services (Google Play Services)
- extra-google-m2repository (Support Repository -> Google Repository)
- extra-android-m2repository (Support Repository -> Android Support Repository)
```
Apply

#### Setup Android Emulators
1. Open Android studio
2. Open Existing Project -> Select -> Project folder -> Android
3. Tools -> Android -> AVD Manager from Menu
4. Create Virtual Device - https://developer.android.com/studio/run/managing-avds.html for reference
5. Start emulator using AVD name as created in AVD Manager


### XCODE
- Install Version 8.3.3

### Coding Practices
 - We are using `class properties + arrow function` instead of class methods and using `super(props)` syntax to define class methods. Blog [URL (in "ECMAScript 2015 classes with class properties" section)](http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/)
 - We are using Flow for static type checking. Install a compatible plugin for Flow in your editor to see errors(can use linter-flow for Atom). Also install flow-bin globally. Add `/* @flow */` to all the files you want to typecheck. Use `flow check` from command line to see complete list of issues. https://github.com/facebook/flow
## Code Snippets
- Sample Page Snippet:
```
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SomeComponent from '../../components/SomeComponent/SomeComponent.component';
import {connect} from 'react-redux';

class SomeComponentPage extends Component {
  componentWillMount () {
  }
  render () {
    return <SomeComponent/>;
  }
}

SomeComponentPage.defaultProps = {
  incCount: null,
  count: 0
};
SomeComponentPage.propTypes = {
  incCount: PropTypes.func,
  count: PropTypes.number
};
const mapStateToProps = (state) => {
};
const mapDispatchToProps = (dispatch) => ({
});
const ConnectedSomeComponentPage = connect(mapStateToProps, mapDispatchToProps)(SomeComponentPage);
export default ConnectedSomeComponentPage;
```
- Sample Component Snippet:
```
import React, {Component} from 'react';
import Proptypes from 'prop-types';
import {View, Text} from 'react-native';
class SomeComponent extends Component {
  render () {
    return (
      <View>
        <Text>Some Text</Text>
      </View>);
  }
}
SomeComponent.defaultProps = {
};
SomeComponent.propTypes = {
};
export default SomeComponent;
```
- Sample Snapshot Test:
```
//File name: ./__test__/SomeDumbComponent.component.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import SomeDumbComponent from '../SomeDumbComponent.component';
describe('SomeDumbComponent component', () => {
  it('SomeDumbComponent: renders correctly', () => {
    const tree = renderer.create(<SomeDumbComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```

#### Pages conventions:
- Component defined in .page.js should be named as `<SomeComponent>Page`.
- The page will import `SomeComponent` from components folder and just render it.
- The page should never import react-native components.
- Only the page should have access to dispatch and the store state, if required.
- All the routes should have a page file, even if the route contains static information. `.route.js` file should only import files from pages folder.

### Deployment

#### ANDROID
##### For Dev Build:
- For automated build without any user input.

```
BUILD_NAME=1.1.1 BUILD_NUMBER=11 DECRYPT_PASSWORD=<PASSWORD> ANDROID_KEYSTORE_PASSWORD=<PASSWORD> ANDROID_KEY_PASSWORD=<PASSWORD> yarn build:android:dev
```
- For building with interactive UI just omit the env variables. Any env variable you omit, you would be asked to enter.
```
yarn build:android:dev
```

#### IOS
##### For Dev Build:
- For automated build without any user input.

```
BUILD_NAME=1.1.1 BUILD_NUMBER=11 DECRYPT_PASSWORD=<PASSWORD> IOS_CERTIFICATE_KEY=<PASSWORD> yarn build:ios:dev
```
- For building with interactive UI just omit the env variables. Any env variable you omit, you would be asked to enter.
```
yarn build:ios:dev
```

PS: **Advanced configuration for IOS AND ANDROID Builds is present in `.env` files located at `config/.env.*`**

#### Storing sensitive files in the repo:

Ideally all sensitive files should be encrypted before pushing it onto the repo (even if the repo is Private).

- **To encrypt:**
```
openssl aes-256-cbc -in <FILENAME> -out <FILENAME>.enc -a
```
example:
```
openssl aes-256-cbc -in dev_release.keystore -out dev_release.keystore.enc -a
```
Enter a password when prompted and keep it safe.


- **To decrypt the same file:**
```
openssl aes-256-cbc -k <PASSWORD> -in <FILENAME>.enc -d -a -out <FILENAME>
```
example:
```
openssl aes-256-cbc -k <PASSWORD> -in dev_release.keystore.enc -d -a -out dev_release.keystore
```

#### Uploading to TestFairy

- Run the apk or ipa build.
- TESTFAIRY_UPLOAD_KEY=<API KEY> sh scripts/tf_uploader.sh ANDROID
  or
  TESTFAIRY_UPLOAD_KEY=<API KEY> sh scripts/tf_uploader.sh IOS

Optionally you can pass $BUILD_NAME $BUILD_NUMBER to the tf_uploader.sh to add to the testfairy email.

### Adding/Changing Icons in react-native

[Here is the reference](https://truedmp.atlassian.net/wiki/spaces/IS/pages/14909778/Adding+changing+svg+icons+in+react-native) for using, adding and changing svg icons in react-native.

### Navigating using react-navigation

[Here is the reference](https://truedmp.atlassian.net/wiki/x/AYD9) for navigation in react-native using react-navigation.

### Updating translation files

Our translations are coming from the CMS whenever the app launches. We also save the translations on the localStorage in case the CMS API fails. Whenever we wish to update the translations files on local, we will update it on the CMS as well. Please refer [here](https://bitbucket.org/truedmp/iservice-cms-management) to know how to update the translations on the CMS.

### Reading the environment config in build resources

#### IOS
You can read the environment config in `Info.plist`. For that you need to refer the config variable as `__RN_CONFIG_{VARIABLE_NAME}`. For example if you want to read config called APP_NAME in Info.plist then just refer it using `__RN_CONFIG_APP_NAME`. Also make sure to do `Product > Clean` for the changes to reflect.

#### ANDROID
You can read the environment config in any Android XML files directly. For that you need to refer the config variable as `@string/{VARIABLE_NAME}` .For example if you want to read config called APP_NAME in Strings.xml then just refer it's value as `@string/APP_NAME`

[Here is the reference](https://truedmp.atlassian.net/wiki/x/AYD9) for navigation in react-native using react-navigation.


### Upgrading React Native versions

1. run react-native-git-upgrade
[Reference can be found here](https://facebook.github.io/react-native/docs/upgrading.html)

2. Fix any conflicts that is shown after the react-native-git-upgrade process. Be careful if the conflicts are in IOS project files. These are difficult to fix and should be fixed carefully.

3. Since we are also using cocoapods. We will also need to update the pods.
 3.1 - First update cocoapods local repo - `pod repo update`
 3.2 - Then do `cd ios`
 3.3 - Finally `pod install`.
