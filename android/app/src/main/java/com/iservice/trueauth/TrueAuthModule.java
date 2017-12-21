package com.iservice.trueauth;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class TrueAuthModule extends ReactContextBaseJavaModule {
  public static Promise promiseInst;
  private static final String TRUE_AUTH_ERROR = "TRUE_AUTH_ERROR";

  public TrueAuthModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "TrueAuth";
  }

  @ReactMethod
  public void login(String language, Promise promise) {
    promiseInst = promise;

    try {
        Activity mActivity = getCurrentActivity();
        Intent intent = new Intent(mActivity, TrueSDK.class);
        intent.putExtra("LANGUAGE", language);
        intent.putExtra("METHOD", "LOGIN");
        mActivity.startActivity(intent);
    } catch (IllegalViewOperationException e) {
        promise.reject(TRUE_AUTH_ERROR, e);
    }
  }

  @ReactMethod
  public void register(String language, Promise promise) {
    promiseInst = promise;

    try {
        Activity mActivity = getCurrentActivity();
        Intent intent = new Intent(mActivity, TrueSDK.class);
        intent.putExtra("LANGUAGE", language);
        intent.putExtra("METHOD", "REGISTER");
        mActivity.startActivity(intent);
    } catch (IllegalViewOperationException e) {
        promise.reject(TRUE_AUTH_ERROR, e);
    }
  }


  @ReactMethod
  public void checkLoginAndGetAccessToken(Promise promise) {
    promiseInst = promise;

    try {
        Activity mActivity = getCurrentActivity();
        Intent intent = new Intent(mActivity, TrueSDK.class);
        intent.putExtra("METHOD", "CHECK_LOGIN_AND_GET_ACCESS_TOKEN");
        mActivity.startActivity(intent);
    } catch (IllegalViewOperationException e) {
        promise.reject(TRUE_AUTH_ERROR, e);
    }
  }

  @ReactMethod
  public void getAccessToken(Promise promise) {
    promiseInst = promise;

    try {
        Activity mActivity = getCurrentActivity();
        Intent intent = new Intent(mActivity, TrueSDK.class);
        intent.putExtra("METHOD", "GET_ACCESS_TOKEN");
        mActivity.startActivity(intent);
    } catch (IllegalViewOperationException e) {
        promise.reject(TRUE_AUTH_ERROR, e);
    }
  }

  @ReactMethod
  public void getRefreshToken(Promise promise) {
    promiseInst = promise;

    try {
        Activity mActivity = getCurrentActivity();
        Intent intent = new Intent(mActivity, TrueSDK.class);
        intent.putExtra("METHOD", "GET_REFRESH_TOKEN");
        mActivity.startActivity(intent);
    } catch (IllegalViewOperationException e) {
        promise.reject(TRUE_AUTH_ERROR, e);
    }
  }

  @ReactMethod
  public void logout(Promise promise) {
    promiseInst = promise;
    try {
        Activity mActivity = getCurrentActivity();
        Intent intent = new Intent(mActivity, TrueSDK.class);
        intent.putExtra("METHOD", "LOGOUT");
        mActivity.startActivity(intent);
    } catch (IllegalViewOperationException e) {
        promise.reject(TRUE_AUTH_ERROR, e);
    }
  }
}
