package com.iservice;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.masteratul.downloadmanager.ReactNativeDownloadManagerPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.iservice.firebasedynamiclink.FirebaseDynamicLinkPackage;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.airbnb.android.react.maps.MapsPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.iservice.trueauth.TrueAuthPackage;
import com.testfairy.react.TestFairyPackage; // import package
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

// Required package
import io.invertase.firebase.RNFirebasePackage; // <-- Add this line
// Optional packages - add as appropriate
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.crash.RNFirebaseCrashPackage; // Firebase Crash Reporting
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeDownloadManagerPackage(),
          new RNFetchBlobPackage(),
          new LinearGradientPackage(),
          new VectorIconsPackage(),
          new ReactNativeRestartPackage(),
          new ReactNativeExceptionHandlerPackage(),
          new RNVersionNumberPackage(),
          new MapsPackage(),
          new RNDeviceInfo(),
          new SplashScreenReactPackage(),
          new GoogleAnalyticsBridgePackage(),
          new RNI18nPackage(),
          new ReactNativeConfigPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseCrashPackage(),
          new RNFirebaseRemoteConfigPackage(),
          new RNFirebaseDatabasePackage(),
          new RNFirebaseMessagingPackage(),
          new TestFairyPackage(),
          new TrueAuthPackage(),
          new FirebaseDynamicLinkPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
