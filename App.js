import React, {useState, useEffect} from 'react';

import {Provider} from 'react-redux';
import {StyleSheet, Dimensions} from 'react-native';
import {View, NativeBaseProvider} from 'native-base';
import LottieView from 'lottie-react-native';
import {NavigationContainer} from '@react-navigation/native';
import './IMLocalize';
import {store, persistor} from './state/store';
import {PersistGate} from 'redux-persist/integration/react';
import Onboarding from './components/Onboarding';
import DrawerScreenComponent from './drawerScreen';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from './state/index';

/**
 * the Main screen of app Wrapped from navigation container.
 * @Navigator `DrawerScreenComponent`
 */
const App = () => {
  return (
    <NavigationContainer>
      <DrawerScreenComponent />
    </NavigationContainer>
  );
};

/**
 * Root of the project Wrapped service from Lib.
 * @wrapped `Provider` from redux.
 * @wrapped `PersistGate` from redux persist.
 * @wrapped `NativeBaseProvider` from nativebase
 * @app `RootScreen`
 * @returns `ReactDOM`
 */
const ReactWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <RootScreen />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

/**
 * Entry point of the application This Component rendered welcome Animation and decide to render `OnboardScreen` or `App`
 * @warning OnboardScreen Launch only app launch first time.
 * @logic if `animation` finish launch then check value in asynceStorage `OnboardScreen` islaunch if launch already then render App ,Else render `OnboardScreen`  then render `App`
 * @returns
 */
const RootScreen = () => {
  const isHermes = () => !!global.HermesInternal;
  console.log(isHermes());
  const onBoardState = useSelector(state => state.onBoard);
  const dispatch = useDispatch();
  const {setViewedOnboard} = bindActionCreators(
    actionCreators.onBoardActionCreator,
    dispatch,
  );
  const [animation, setAnimation] = useState(false);

  const handleOnboardFinish = () => {
    setViewedOnboard('true');
  };

  return (
    <>
      {!animation ? (
        <View
          style={{
            backgroundColor: 'white',
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}>
          <LottieView
            source={require('./assets/welcome.json')}
            onAnimationFinish={() => {
              setAnimation(true);
            }}
            autoPlay={true}
            loop={false}
            speed={1}
          />
        </View>
      ) : onBoardState.viewed == 'false' ? (
        <Onboarding handleDone={handleOnboardFinish} />
      ) : (
        <App />
      )}
    </>
  );
};

// const styles = StyleSheet.create({});

export default ReactWrapper;
