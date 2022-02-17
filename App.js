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
import Onboarding from './components/Onboarding';

import PageStack from './screens/index';

import DrawerScreenComponent from './drawerScreen';

const App = () => {
  return (
    <NavigationContainer>
      <DrawerScreenComponent />
    </NavigationContainer>
  );
};

const RootScreen = () => {
  const [showOnboard, setShowOnboard] = useState(true);
  const handleOnboardFinish = () => {
    setShowOnboard(false);
  };
  return (
    <Provider store={store}>
      < PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>



          <>
            {showOnboard && <Onboarding handleDone={handleOnboardFinish} />}
            {!showOnboard && <App />}

          </>
        </NativeBaseProvider>

      </PersistGate>

    </Provider>

  );
}



const styles = StyleSheet.create({});

export default RootScreen;
