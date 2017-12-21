//
//  TrueIDAuthentication.h
//  TestAFOAuth2
//
//  Created by MON True on 4/8/2557 BE.
//  Copyright (c) 2557 MON True. All rights reserved.
//
// update 07-10-2014 by MoN

#import <Foundation/Foundation.h>


@protocol TrueIDAuthenticationDelegate <NSObject>
- (void)loginSuccess:(NSDictionary *)dict;
- (void)loginPageError:(NSString *)error;
- (void)cancelLoginTrueIDView;
@end


typedef void (^TrueIDBlock)();
typedef void (^TrueIDFailBlock)(NSDictionary * dictError);

@interface TrueIDAuthentication : NSObject

@property (assign) id<TrueIDAuthenticationDelegate> delegate;

@property (copy) TrueIDBlock loadBlock;
@property (copy) TrueIDBlock finishedBlock;
@property (copy) TrueIDFailBlock failedBlock;

@property (assign) BOOL hideCancelButton;
@property (assign) BOOL isDevMode;


+ (TrueIDAuthentication *)sharedInstance;


/**
 init setup client ID key and client Secret key
 */
- (void)initWithClientID:(NSString *)clientID
            clientSecret:(NSString *)clientSecret;

/**
 call refreshAccessToken [applicationDidBecomeActive]
 */
- (void)refreshAccessToken:(void (^)(NSDictionary * messageDict)) completeBlock;
//- (void)refreshAccessToken;

/**
 call Login setup UserName And Password 
 */
- (void)loginAllUser:(NSString *)username
            password:(NSString *)password
             loading:(TrueIDBlock)loadBlock
             success:(TrueIDBlock)sucessBlock
             failure:(TrueIDFailBlock)failureBlock;

-(void)checkScope;

-(void)registerNewUser:(NSDictionary *)dict
               success:(TrueIDBlock)sucessBlock
                  fail:(TrueIDFailBlock)failBlock;

/**
 Log OUT
 */
- (void)logoutSuccess:(TrueIDBlock)sucessBlock
               failed:(TrueIDFailBlock)failBlock;
/**
 get Profile
 */

- (void)getProfileSucess:(void (^)(NSDictionary * dictProfile))completed
                  failed:(void(^)(NSDictionary * dictError))failed;
/**
 get AccessToken
 */
- (void)getAccessToken:(void(^)(NSString * accessToken))sucessBlock
                failed:(void(^)(NSDictionary * dict))failBlock;

/**
  get URL Forget password
*/
- (NSString *)getURLForgetPassword:(NSString *)appID secretKey:(NSString *)secretKey currentLang:(NSString *)language;

/**
 get URL Register
 */
- (NSString *)getURLRegister:(NSString *)appID secretKey:(NSString *)secretKey currentLang:(NSString *)language;

/**
 get URL Policy
 */
- (NSString *)getURLPolicyByLanguage:(NSString *)language;

/**
 get URL Help
 */
- (NSString *)getURLHelpByLanguage:(NSString *)language;

+ (void) setLanguage:(NSString*)lang;
+ (NSString *) getCurrentLanguage;

+ (NSString *) getAccessToken;
+ (NSString *) getRefreshToken;
+ (NSString *) getLogAllOutput;
+ (NSString *) getClientIDParent;
+ (NSString *) getClientSecretParent;
+ (NSString *) getUserName;
+ (NSString *) getUserVersion;
+ (NSString *) getMigrationURL;
+ (NSString *) getAppID;
+ (NSString *) getSecretKey;
+ (BOOL) checkHasLogin;
+ (void) gotoTrueIDApp;

/**
 Login
 */
- (void)loginWithFlowType:(NSString *)flowType;

/**
 Register
 */
- (void)registerWithFlowType:(NSString *)flowType;

/**
 Handle Open URL
 */
- (bool) handleOpenURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication;

/**
 Get ClientCredentials Pofile
 */
- (void)getClientCredentialsPofile:(NSString *)access_token refreshToken:(NSString *)refresh_token completed:(void (^)(NSDictionary * dictProfile))completed failed:(void(^)(NSDictionary * dictError))failed;

- (void)setParentTokenByAccessToken:(NSString *)accessToken andRefreshToken:(NSString *)refreshToken;
- (void)newExchangeCodeConsent:(NSString *)code :(void (^)(BOOL complete, NSDictionary * messageDict)) completeBlock;

@end
