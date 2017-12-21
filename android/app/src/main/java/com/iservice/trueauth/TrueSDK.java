package com.iservice.trueauth;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.WritableMap;
import com.tdcm.truelifelogin.authentication.LoginService;
import com.tdcm.truelifelogin.interfaces.LoginServiceListener;

import org.json.JSONObject;

// ****Error codes****
// AUTH_FAILED - Login or register failed
// AUTH_CANCELLED - User clicked `Cancel` button
// GET_ACCESS_TOKEN_FAILED
// LOGOUT_FAILED
// CHECK_EXISTING_LOGIN_FAILED
// JSON_PARSE_FAILED
// *******************

public class TrueSDK extends Activity implements LoginServiceListener {
  // default language to open the login page is Thai
  private String lang = "th";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    String methodToCall;

    // read the language that is passed
    lang = getIntent().getStringExtra("LANGUAGE");
    methodToCall = getIntent().getStringExtra("METHOD");

    LoginService mLoginService = new LoginService(this);

    switch(methodToCall) {
      case "LOGIN": {
        this.login(mLoginService);
        break;
      }
      case "REGISTER": {
        this.register(mLoginService);
        break;
      }
      case "CHECK_LOGIN_AND_GET_ACCESS_TOKEN": {
        this.onResuming(mLoginService);
        break;
      }
      case "GET_ACCESS_TOKEN": {
        this.getAccessToken(mLoginService);
        break;
      }
      case "GET_REFRESH_TOKEN": {
        this.getRefreshToken(mLoginService);
        break;
      }
      case "LOGOUT": {
        this.logout(mLoginService);
        break;
      }
      default: {
        Log.d("NO METHOD SPECIFIED", methodToCall);
        finish();
        break;
      }
    }
  }

  public void login(LoginService mLoginService) {
    mLoginService.login(lang);
  }

  public void register(LoginService mLoginService) {
    mLoginService.register(lang);
  }

  public void onResuming(LoginService mLoginService) {
    mLoginService.onResume();
  }

  public void getAccessToken(LoginService mLoginService) {
    try {
      String accessToken = mLoginService.getAccessToken();
      com.iservice.trueauth.TrueAuthModule.promiseInst.resolve(accessToken);
    } catch (Exception err) {
      String code = "GET_ACCESS_TOKEN_FAILED";
      com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, err.getMessage(), getErrorObject(code));
    }
    finish();
  }

  public void getRefreshToken(LoginService mLoginService) {
    try {
      String refreshToken = mLoginService.getRefreshToken();
      com.iservice.trueauth.TrueAuthModule.promiseInst.resolve(refreshToken);
    } catch (Exception err) {
      String code = "GET_REFRESH_TOKEN_FAILED";
      com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, err.getMessage(), getErrorObject(code));
    }
    finish();
  }

  public void logout(LoginService mLoginService) {
    mLoginService.logout();
  }

  @Override
  public void onLoginSuccess(String userProfileData, int expiredTimeInSecond) {
    try {
      // object to return
      JSONObject accessTokenWithProfile = new JSONObject();

      // get the current access token
      LoginService mLoginService = new LoginService(this);
      String accessToken = mLoginService.getAccessToken();
      accessTokenWithProfile.put("accessToken", accessToken);

      //parsing the response to json object
      JSONObject profileJSON = new JSONObject(userProfileData);
      accessTokenWithProfile.put("profile", profileJSON);

      WritableMap map = JSONConvertor.convertJsonToMap(accessTokenWithProfile);
      com.iservice.trueauth.TrueAuthModule.promiseInst.resolve(map);
    } catch (Throwable t) {
      String code = "JSON_PARSE_FAILED";
      Log.e("Parse Error", "Could not parse malformed JSON: \"" + userProfileData + "\"");
      com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, code, getErrorObject(code));
    }
    finish();
  }

  @Override
  public void onLoginError(String errorMessage) {
    if (com.iservice.trueauth.TrueAuthModule.promiseInst != null) {
      String code = "AUTH_FAILED";
      com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, errorMessage, getErrorObject(code));
      com.iservice.trueauth.TrueAuthModule.promiseInst = null;
    }
    finish();
  }

  @Override
  public void onLogoutRespond(boolean isSuccess, String response) {
    if (isSuccess) {
      com.iservice.trueauth.TrueAuthModule.promiseInst.resolve(null);
    } else {
      String code = "LOGOUT_FAILED";
      com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, code, getErrorObject(code));
    }
    finish();
  }

  @Override
  public void onRefreshAccessToken(boolean isSuccess) {
    LoginService mLoginService = new LoginService(this);
    if (isSuccess) {
      mLoginService.getLoginInfo();
    } else {
      String code = "CHECK_EXISTING_LOGIN_FAILED";
      com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, code, getErrorObject(code));
      finish();
    }
  }


  @Override
  public void onCanceled() {
    String code = "AUTH_CANCELLED";
    com.iservice.trueauth.TrueAuthModule.promiseInst.reject(code, code, getErrorObject(code));
    finish();
  }

  @Override
  public void onFindTrueIDApp(boolean isFound) {
    Log.d("LOGIN find true id app", String.valueOf(isFound));
  }

  public Throwable getErrorObject(String code) {
    Throwable err = new Throwable(code);
      return err;
  }
}
