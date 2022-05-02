/**
 * @format
 */
import 'moment';
import 'moment/locale/th';
import './translations/calendarLocale';

import {LogBox} from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import './translations/day';

GoogleSignin.configure({
  webClientId:
    '358505907509-gibbr7tbcgd1i71r0gpo4g3ukblj2q1b.apps.googleusercontent.com',
});

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'Sending `LogRocketSDKOnError` with no listeners registered.',
  'LogRocket initialization failed! Check device logs for further details.',
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
  'LogRocket: Redux state is large (> 1MB), consider using stateSanitizer to prevent data loss: https://docs.logrocket.com/reference#redux-logging',
]);
if (__DEV__) {
  require('react-native-performance-flipper-reporter').setupDefaultFlipperReporter();
}
PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification :', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
