import React, { useState, useEffect, } from 'react';

import { Provider } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  Dimensions
} from 'react-native';
import {
  View,
  NativeBaseProvider,
  Box,
  ZStack,
  Center,
  ScrollView,
  VStack,
  Heading,
  useTheme,
} from 'native-base';
import LottieView from 'lottie-react-native';

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
  const AnimationComponent = (
    <View style={{ backgroundColor: "white" }
    }>
      <LottieView
        source={require('./assets/lf30_editor_1h2rmbkj.json')}
        onAnimationFinish={() => {
          setAnimation(true)
        }}
        autoPlay={true}
        loop={false}
        speed={1}

      />
    </View >
  )

  const [animation, setAnimation] = useState(false)

  const handleOnboardFinish = () => {
    // setShowOnboard(false);
    setViewedOnboard("true")
    console.log("Handle", onBoardState.viewed)

  };

  return (
    <>
      {!animation ? (<View style={{
        backgroundColor: "white",
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}>
        <LottieView
          source={require('./assets/welcome.json')}
          onAnimationFinish={() => {
            setAnimation(true)
          }}
          autoPlay={true}
          loop={false}
          speed={1}
        />
      </View>) : onBoardState.viewed == "false" ? <Onboarding handleDone={handleOnboardFinish} /> : <App />}

    </>

  );
}



const styles = StyleSheet.create({});

export default ReactWrapper;
