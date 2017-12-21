//
//  TrueID-Constants.h
//  AppTestTrueID
//
//  Created by MON True on 4/4/2557 BE.
//  Copyright (c) 2557 MON True. All rights reserved.
//

#import <Foundation/Foundation.h>



// =================== Web Service ===================

#define API_DOMAIN(isdev)                   (isdev ? @"trueid-dev.net" : @"trueid.net")


#define LOGIN_URL(isdev,uri,device,id,secret,lan,flow,device_id)   [NSString stringWithFormat:@"https://www.%@/member/login?redirect_uri=%@&device=%@&client_id=%@&secret=%@&lang=%@&flow=%@&device_id=%@",API_DOMAIN(isdev),uri,device,id,secret,lan,flow,device_id]

#define API_LOGIN_WITH_MASTER(isdev)        [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/token",API_DOMAIN(isdev)]
#define API_LOGIN(isdev)                    [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/token",API_DOMAIN(isdev)]
#define API_CHECKSCOPE(isdev)               [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/checkscope",API_DOMAIN(isdev)]
#define API_REQUESTSCOPE(isdev)             [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/auth",API_DOMAIN(isdev)]
#define API_EXCHANGE_CODE(isdev)            [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/token",API_DOMAIN(isdev)]
#define API_REFRESH_ACCESSTOKEN(isdev)      [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/token",API_DOMAIN(isdev)]
#define API_REVOKETOKEN(isdev)              [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/revoke?access_token=275a1bce3256c93d74c023ee0053469ba622c510",API_DOMAIN(isdev)]
#define API_GETPROFILE(isdev,accessToken)   [NSString stringWithFormat:@"https://data.%@/profile/me?access_token=%@&format=json",API_DOMAIN(isdev),accessToken]

#define URL_FORGETPW(isdev)                 [[NSString stringWithFormat:@"https://www.%@/member/recovery",API_DOMAIN(isdev)] stringByAppendingString:@"?client_id=9&device=%@&app_id=%@&secretkey=%@&lang=%@"]
#define URL_REGISTER(isdev)                 [[NSString stringWithFormat:@"https://www.%@/member/register",API_DOMAIN(isdev)] stringByAppendingString:@"?client_id=9&device=%@&app_id=%@&secretkey=%@&la ng=%@"]
#define URL_SIGNUP(isdev,client_id,secret,device,flow,lang,device_id)   [NSString stringWithFormat:@"https://www.%@/member/signup?redirect_uri=trueid://&device=%@&client_id=%@&secret=%@&flow=%@&lang=%@&device_id=%@",API_DOMAIN(isdev),device,client_id,secret,flow,lang,device_id]
#define API_checkParentToken(isdev,parentAccessToken)   [NSString stringWithFormat:@"https://auth.%@/rest/oauth2app/tokeninfo?access_token=%@",API_DOMAIN(isdev),parentAccessToken]


// =================== Config ===================

#define TRUEID_SDK_VERSION              @"3.2.2"

#define APP_ID_1nd                      @"9" //Parent
#define SECRET_1nd                      @"82fc7aee615804acc3bd8501735d126a" //Parent

#define AccessToken1st                  @"accessToken1st"      //parent
#define RefreshToken1st                 @"refreshToken1st"     //parent
#define AccessToken2st                  @"accessToken2st"      // child
#define RefreshToken2st                 @"refreshToken2st"     // child
#define AccessToken2stExpireCache       @"sjdflkjsei54664lkjLKjlskdw"

#define AccessToken                     @"AccessToken"
#define UserName                        @"username"  //parent

#define TCDKEY                          @"9834yt09wjerhgoiryt09ip5"

#define kColor_Red                      [UIColor redColor]
#define kColor_White                    [UIColor whiteColor]

#define isiPhone                        (![[UIDevice currentDevice] respondsToSelector:@selector(userInterfaceIdiom)] || [[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone)
#define isTH                            ([[[NSUserDefaults standardUserDefaults] objectForKey:@"KJLanguage"] isEqualToString:@"th"] ? YES : NO)
#define IS_IPHONE_5                     (([[UIScreen mainScreen] bounds].size.height-568)? NO:YES)


