//
//  RNTMapView.h
//  SuperCalendar
//
//  Created by Mawin Sukmongkol on 31/1/2565 BE.
//

#import <Foundation/Foundation.h>
#import <MapKit/MapKit.h>

#import <React/RCTComponent.h>

@interface RNTMapView: MKMapView

@property (nonatomic, copy) RCTBubblingEventBlock onRegionChange;

@end
