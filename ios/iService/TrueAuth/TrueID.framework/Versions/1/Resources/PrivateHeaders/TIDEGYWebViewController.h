//
//  EGYWebViewController.h
//
//  Created by Mokhles Hussien on 29.08.2013.
//  Copyright 2013 iMokhles. All rights reserved.
//
//  https://github.com/iMokhles/EGYWebViewController

#import <MessageUI/MessageUI.h>
#import "TIDEGYModalWebViewController.h"

@protocol TIDEGYWebViewControllerDelegate <NSObject>
@optional
-(void) skipRegister;
-(void) dismissView;
-(void) registerSuccessFromWeb:(NSString *)dict;
-(void) forgetPasswordSuccess:(NSString *)dict;

@end

@interface TIDEGYWebViewController : UIViewController
@property (assign) id<TIDEGYWebViewControllerDelegate> delegate;

- (id)initWithAddress:(NSString*)urlString;
- (id)initWithURL:(NSURL*)URL;

@end
