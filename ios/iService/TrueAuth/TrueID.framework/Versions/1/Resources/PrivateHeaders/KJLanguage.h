//
//  KJLanguage.h
//  TrueIDFramework
//
//  Created by Kevin Jone on 9/29/15.
//  Copyright (c) 2015 BEAU :). All rights reserved.
//

#import <Foundation/Foundation.h>

@interface KJLanguage : NSObject

@property (strong, nonatomic)NSString *currentLanguage;

+ (KJLanguage *)sharedInstance;
+ (void)initialize;
+ (void)setLanguage:(NSString *)l;
+ (NSString *)get:(NSString *)key alter:(NSString *)alternate;

@end
