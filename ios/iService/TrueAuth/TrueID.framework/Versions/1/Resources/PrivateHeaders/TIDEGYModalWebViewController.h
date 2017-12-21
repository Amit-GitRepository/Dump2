//
//  EGYModalWebViewController.h
//
//  Created by Mokhles Hussien on 29.08.2013.
//  Copyright 2013 iMokhles. All rights reserved.
//
//  https://github.com/iMokhles/EGYWebViewController

#import <UIKit/UIKit.h>


@class TIDEGYWebViewController;

@protocol TIDEGYModelDelegate <NSObject>
-(void)registerSuccess:(NSString *)responseStr;
-(void)forgetPasswordSuccess:(NSString *)responseStr;
-(void)skipRegister;
@end

@interface TIDEGYModalWebViewController : UINavigationController
@property (nonatomic,weak) id<TIDEGYModelDelegate> delegate;

- (id)initWithAddress:(NSString*)urlString;
- (id)initWithURL:(NSURL *)URL;
@property (nonatomic, strong) UIColor *barsTintColor;

@end
