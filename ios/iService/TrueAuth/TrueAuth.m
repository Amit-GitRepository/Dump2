#import "TrueAuth.h"
#import "ReactNativeConfig.h"

@implementation TrueAuth

#define ENV_NAME [ReactNativeConfig envFor:@"ENV_NAME"]
#define TRUEID_APPID [ReactNativeConfig envFor:@"IOS_TRUE_CLIENT_ID"]
#define TRUEID_SECRET_KEY [ReactNativeConfig envFor:@"IOS_TRUE_CLIENT_SECRET"]
#define TRUE_CLIENT_FLOW [ReactNativeConfig envFor:@"TRUE_CLIENT_FLOW"]
// ****Error codes****
// 300:AUTH_FAILED - Login or register failed
// 301:AUTH_CANCELLED - User clicked `Cancel` button
// 302:GET_ACCESS_TOKEN_FAILED
// 303:LOGOUT_FAILED
// 304:CHECK_EXISTING_LOGIN_FAILED
// *******************

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initialize)
{
  [[TrueIDAuthentication sharedInstance] initWithClientID:TRUEID_APPID clientSecret:TRUEID_SECRET_KEY];
  [TrueIDAuthentication sharedInstance].delegate = self;
  [TrueIDAuthentication sharedInstance].hideCancelButton = NO;
  //**************************
  // isDevMode = YES for development mode, NO for production mode
  // 1.) The issue form Apple reviewer team: production mode server trueid.net can't reach form Apple reviewer team
  // but development mode server trueid-dev.net is work well the server side team are fixing.
  // 2.) For quick solution you can load your remote config and set TRUE value for development mode while in review and set FALSE after app has been approved.
  //**************************
  [TrueIDAuthentication sharedInstance].isDevMode = ([ENV_NAME  isEqual:@"DEV"]) ? YES : NO;
}

RCT_EXPORT_METHOD(login:(NSString *)selectedLanguage loginEventsWithResolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject)
{
  UIApplication* app = [UIApplication sharedApplication];
  [TrueIDAuthentication setLanguage:selectedLanguage];
  NSBundle *bundle = [NSBundle bundleWithURL:[[NSBundle mainBundle] URLForResource:@"TrueIDResource" withExtension:@"bundle"]];
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main-TrueID" bundle:bundle];
  TrueIDWebViewController *loginVC = (TrueIDWebViewController *)[storyboard instantiateViewControllerWithIdentifier:@"TrueIDWebViewController"];
  loginVC.appID = TRUEID_APPID;
  loginVC.secretKey = TRUEID_SECRET_KEY;
  loginVC.delegate = self;
  loginVC.flowType = TRUE_CLIENT_FLOW;
  loginVC.urlType = TrueLoginWebViewURLTypeLogin;
  loginVC.title = @"Login with TrueID";
  self.resolve = resolve;
  self.reject = reject;

  UINavigationController *nvc = [[UINavigationController alloc] initWithRootViewController:loginVC];
  nvc.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
  dispatch_sync(dispatch_get_main_queue(), ^{
    [app.delegate.window.rootViewController presentViewController:nvc animated:YES completion:nil];
  });
}

RCT_EXPORT_METHOD(register:(NSString *)selectedLanguage loginEventsWithResolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject)
{

  UIApplication* app = [UIApplication sharedApplication];
  [TrueIDAuthentication setLanguage:selectedLanguage];
  NSBundle *bundle = [NSBundle bundleWithURL:[[NSBundle mainBundle] URLForResource:@"TrueIDResource" withExtension:@"bundle"]];
  UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main-TrueID" bundle:bundle];
  TrueIDWebViewController *registerVC = (TrueIDWebViewController *)[storyboard instantiateViewControllerWithIdentifier:@"TrueIDWebViewController"];
  registerVC.appID = TRUEID_APPID;
  registerVC.secretKey = TRUEID_SECRET_KEY;
  registerVC.delegate = self; // callback to TrueLoginWebViewDelegate implements obj loginSuccess,loginPageError,cancelLoginTrueIDView
  registerVC.flowType = @"A";
  registerVC.urlType = TrueLoginWebViewURLTypeRegister;
  registerVC.title = @"Register with TrueID";
  self.resolve = resolve;
  self.reject = reject;

  UINavigationController *nvc = [[UINavigationController alloc] initWithRootViewController:registerVC];
  nvc.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
  dispatch_sync(dispatch_get_main_queue(), ^{
    [app.delegate.window.rootViewController presentViewController:nvc animated:YES completion:nil];
  });
}

RCT_EXPORT_METHOD(getAccessToken:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSString *accessToken = [TrueIDAuthentication getAccessToken];
    resolve(accessToken);
  }
  @catch (NSException *exception) {
    NSDictionary *dict = @{@"error":@"GET_ACCESS_TOKEN_FAILED"};
    NSError *err = [NSError errorWithDomain:@"GET_ACCESS_TOKEN_FAILED" code:302 userInfo:dict];
    reject(@"GET_ACCESS_TOKEN_FAILED", exception.reason, err);
  }
}

RCT_EXPORT_METHOD(logout:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject)
{
  [[TrueIDAuthentication sharedInstance] logoutSuccess:^{
    resolve(nil);
  } failed:^(NSDictionary *dictError) {
    NSDictionary *dict = @{@"error":@"LOGOUT_FAILED"};
    NSError *err = [NSError errorWithDomain:@"LOGOUT_FAILED" code:303 userInfo:dict];
    reject(@"LOGOUT_FAILED", dictError.description, err);
  }];

}

RCT_EXPORT_METHOD(checkLoginAndGetAccessToken:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    //check if user has a valid login
    if ([TrueIDAuthentication checkHasLogin]) {
      [[TrueIDAuthentication sharedInstance] refreshAccessToken:^(NSDictionary *messageDict) {
        if([messageDict objectForKey:@"status"]) {
          NSString *accessToken = [TrueIDAuthentication getAccessToken];
          [[TrueIDAuthentication sharedInstance] getProfileSucess:^(NSDictionary *dictProfile) {
            NSDictionary *accessTokenWithProfile = @{@"profile":dictProfile, @"accessToken":accessToken};
            resolve(accessTokenWithProfile);
          } failed:^(NSDictionary *dictError) {
            NSDictionary *dict = @{@"error":@"CHECK_EXISTING_LOGIN_FAILED"};
            NSError *err = [NSError errorWithDomain:@"CHECK_EXISTING_LOGIN_FAILED" code:304 userInfo:dict];
            reject(@"CHECK_EXISTING_LOGIN_FAILED", dictError.description, err);
          }];
        } else {
          NSDictionary *dict = @{@"error":@"CHECK_EXISTING_LOGIN_FAILED"};
          NSError *err = [NSError errorWithDomain:@"CHECK_EXISTING_LOGIN_FAILED" code:304 userInfo:dict];
          reject(@"CHECK_EXISTING_LOGIN_FAILED", @"CHECK_EXISTING_LOGIN_FAILED", err);
        }
      }];
    } else {
      NSDictionary *dict = @{@"error":@"CHECK_EXISTING_LOGIN_FAILED"};
      NSError *err = [NSError errorWithDomain:@"CHECK_EXISTING_LOGIN_FAILED" code:304 userInfo:dict];
      reject(@"CHECK_EXISTING_LOGIN_FAILED", @"CHECK_EXISTING_LOGIN_FAILED", err);
    }
  } @catch (NSException *exception) {
    NSDictionary *dict = @{@"error":exception};
    NSError *err = [NSError errorWithDomain:@"CHECK_EXISTING_LOGIN_FAILED" code:304 userInfo:dict];
    reject(@"CHECK_EXISTING_LOGIN_FAILED", exception.reason, err);
  }
}

- (void)loginPageError:(NSString *)error{
  if(self.reject != nil) {
    NSDictionary *dict = @{@"error":@"AUTH_FAILED"};
    NSError *err = [NSError errorWithDomain:@"AUTH_FAILED" code:300 userInfo:dict];
    self.reject(@"AUTH_FAILED", error, err);
    self.reject = nil;
  }
}

- (void)loginSuccess:(NSDictionary *)profile{
  @try {
    // fetch accessToken
    NSString *accessToken = [TrueIDAuthentication getAccessToken];
    // we get profile from login success callback
    NSDictionary *accessTokenWithProfile = @{@"profile":profile, @"accessToken":accessToken};
    self.resolve(accessTokenWithProfile);
  } @catch (NSException *exception) {
    // Unable to get access_token so reject the promise
    NSDictionary *dict = @{@"error":@"GET_ACCESS_TOKEN_FAILED"};
    NSError *err = [NSError errorWithDomain:@"GET_ACCESS_TOKEN_FAILED" code:302 userInfo:dict];
    self.reject(@"GET_ACCESS_TOKEN_FAILED", exception.reason, err);
  }
}

- (void) cancelLoginTrueIDView {
  NSDictionary *dict = @{@"error":@"AUTH_CANCELLED"};
  NSError *err = [NSError errorWithDomain:@"AUTH_CANCELLED" code:301 userInfo: dict];
  self.reject(@"AUTH_CANCELLED", @"AUTH_CANCELLED", err);
}

@end
