import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {ThemeProvider, Button, Input, Image} from 'react-native-elements';
import {Map} from '../IosNativeModule/Mapview';
const MapScreen = props => {
  var region = {
    latitude: 37.48,
    longitude: -122.16,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  return (
    <ThemeProvider theme={theme}>
      <View style={{flex: 5}}>
        <Map style={{flex: 1}} region={region} zoomEnabled={true} />
      </View>
    </ThemeProvider>
  );
};

const theme = {
  Button: {
    raised: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  preloader: {
    prosition: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapScreen;
