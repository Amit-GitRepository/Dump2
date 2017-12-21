//
//  TrueIDWebViewController.h
//  TrueIDWebView
//
//  Created by BEAU :) on 2/2/15.
//  Copyright (c) 2015 BEAU :). All rights reserved.
//

#import <UIKit/UIKit.h>


typedef NS_ENUM(NSUInteger, TrueLoginWebViewURLType) {
    TrueLoginWebViewURLTypeLogin,
    TrueLoginWebViewURLTypeRegister
};


@protocol TrueLoginWebViewDelegate <NSObject>
- (void)loginSuccess:(NSDictionary *)dict;
- (void)loginPageError:(NSString *)error;
- (void)cancelLoginTrueIDView;
@end


@interface TrueIDWebViewController : UIViewController

@property (strong, nonatomic) NSString *appID;
@property (strong, nonatomic) NSString *secretKey;

@property (assign, nonatomic) TrueLoginWebViewURLType urlType;
@property (strong, nonatomic) IBOutlet UIWebView *webView;
@property (assign) id<TrueLoginWebViewDelegate> delegate;
@property (nonatomic, strong) NSString *flowType;
@property (strong, nonatomic) IBOutlet UIButton *closeBtn;

- (IBAction)close:(id)sender;

@end
