//
//  RNTMapManager.m
//  SuperCalendar
//
//  Created by Mawin Sukmongkol on 30/1/2565 BE.
//
#import <MapKit/MapKit.h>
#import "RCTConvert+Mapkit.h"
#import "RNTMapManager.h"
#import <React/RCTViewManager.h>
#import "RNTMapView.h"


@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)
RCT_EXPORT_VIEW_PROPERTY(zoomEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(onRegionChange, RCTBubblingEventBlock)
RCT_CUSTOM_VIEW_PROPERTY(region, MKCoordinateRegion, MKMapView)
{
  [view setRegion:json ? [RCTConvert MKCoordinateRegion:json] : defaultView.region animated:YES];
}


- (UIView *)view
{
  RNTMapView *map = [RNTMapView new];
  return map;
}

- (void)mapView:(RNTMapView *)mapView regionDidChangeAnimated:(BOOL)animated
{
  if (!mapView.onRegionChange) {
    return;
  }

  MKCoordinateRegion region = mapView.region;
  mapView.onRegionChange(@{
    @"region": @{
      @"latitude": @(region.center.latitude),
      @"longitude": @(region.center.longitude),
      @"latitudeDelta": @(region.span.latitudeDelta),
      @"longitudeDelta": @(region.span.longitudeDelta),
    }
  });
}
@end
