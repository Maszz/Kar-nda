import React, { useState } from 'react';

import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  View,
} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  ZStack,
  Center,
  ScrollView,
  VStack,
  Heading,
  useTheme,
} from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import './IMLocalize';

import { store, persistor } from './state/store';
import { PersistGate } from 'redux-persist/integration/react'


import PageStack from './screens/index';

import DrawerScreenComponent from './drawerScreen';

const App = () => {
  return (
    <Provider store={store}>
      < PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer>
            <DrawerScreenComponent />
          </NavigationContainer>
          {/* <Example /> */}
        </NativeBaseProvider>
        {/* <TestRedux /> */}
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
