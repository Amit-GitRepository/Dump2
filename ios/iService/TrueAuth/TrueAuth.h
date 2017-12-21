#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import <TrueID/TrueIDAuthentication.h>
#import <TrueID/TrueIDWebViewController.h>

@interface TrueAuth : NSObject <RCTBridgeModule, TrueIDAuthenticationDelegate, TrueLoginWebViewDelegate>

@property (nonatomic, copy) RCTPromiseResolveBlock resolve;
@property (nonatomic, copy) RCTPromiseRejectBlock reject;

@end
