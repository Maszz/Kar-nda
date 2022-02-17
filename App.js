import React, { useState, useEffect } from 'react';

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';
const App = () => {
  return (
    <NavigationContainer>
      <DrawerScreenComponent />
    </NavigationContainer>
  );
};

const ReactWrapper = () => {
  return (
    <Provider store={store}>
      < PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <RootScreen />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>

  );
};
const RootScreen = () => {
  // const [showOnboard, setShowOnboard] = useState(true);
  const onBoardState = useSelector(state => state.onBoard);
  const dispatch = useDispatch();
  const { setViewedOnboard } = bindActionCreators(
    actionCreators.onBoardActionCreator,
    dispatch,
  );

  const handleOnboardFinish = () => {
    // setShowOnboard(false);
    setViewedOnboard("true")
    console.log("Handle", onBoardState.viewed)

  };


  // useEffect(() => {

  // }, [])

  return (
    <>
      {onBoardState.viewed == "false" ? <Onboarding handleDone={handleOnboardFinish} /> : <App />}
      {/* {onBoardState.viewed == "false" && <App />} */}
    </>

  );
}



const styles = StyleSheet.create({});

export default ReactWrapper;
