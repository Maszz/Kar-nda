//
//  RNTDevice.m
//  SuperCalendar
//
//  Created by Mawin Sukmongkol on 30/1/2565 BE.
//

#import "RNTDevice.h"

#import <UIKit/UIKit.h>

@implementation RNTDevice

//export the name of the native module as 'Device' since no explicit name is mentioned
RCT_EXPORT_MODULE(RNTDevice);

//exports a method getDeviceName to javascript
RCT_EXPORT_METHOD(getDeviceName:(RCTResponseSenderBlock)callback){
 @try{
   NSString *deviceName = [[UIDevice currentDevice] name];
   callback(@[[NSNull null], deviceName]);
 }
 @catch(NSException *exception){
   callback(@[exception.reason, [NSNull null]]);
 }
}

@end
