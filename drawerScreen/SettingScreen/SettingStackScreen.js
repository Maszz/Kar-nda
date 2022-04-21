import React, {useEffect, useCallback, useState} from 'react';

import {
  View,
  Button,
  Box,
  HStack,
  VStack,
  Text,
  Spacer,
  Switch,
} from 'native-base';
import {TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import ListComp from '../../components/listComponent';
import {ListBox, Line, ListItem} from '../../components/customList';
import Icon from 'react-native-vector-icons/Ionicons';
import {settingScreenItem} from '../../Constant/index';
import PushNotification from 'react-native-push-notification';
import {useTranslation} from 'react-i18next';
import {useSelector, connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state/index';
const SettingStackScreen = ({notification, eventsState, navigation}) => {
  const {t} = useTranslation();
  // const notification = useSelector(state => state.notifications.notification);
  // const eventsState = useSelector(state => state.events.events);
  const [localNotificationState, setLocalNotificationState] =
    useState(notification);
  const dispatch = useDispatch();
  const {setNotification} = bindActionCreators(
    actionCreators.notificationsActionCreator,
    dispatch,
  );
  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Clicked',
      message: 'payload',
      userInfo: {Test: 'TEst'},
    });
  };

  const scheduleNotifications = (title, message, date) => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: title,
      message: message,
      date: date,
      allowWhileIdle: true,
      id: title + '-' + date.toISOString(),
      repeatType: 'hour',
    });
  };
  const notificationsCallbacks = useCallback(() => {
    console.log(eventsState);
    if (notification) {
      console.log('True');
      // PushNotification.getScheduledLocalNotifications(v => {
      //   console.log(v);
      // });
      for (const event of eventsState) {
        if (new Date(event.start).getTime() > Date.now()) {
          scheduleNotifications(
            event.title,
            event.description,
            new Date(event.start),
          );
        }
      }
    } else {
      console.log('False');
      PushNotification.cancelAllLocalNotifications();
    }
  }, [notification]);
  useEffect(() => {
    // createChannels();
    // console.log('create channel');
    notificationsCallbacks();
  }, [notificationsCallbacks]);

  return (
    <View
      space={4}
      style={{
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#1F2937',
      }}>
      <Box style={{marginTop: 30}}>
        <TouchableOpacity onPress={() => navigation.navigate('Language')}>
          <Box
            style={{marginTop: 3, marginBottom: 3}}
            w={
              Dimensions.get('window').width -
              (10 / 100) * Dimensions.get('window').width
            }
            py={2}
            px={3}
            bgColor={'rgba(147, 147, 147, 0.3)'}
            rounded="lg">
            <HStack space={4} justifyContent="space-between">
              <Icon name="language-sharp" size={30} color="#ecfeff" />
              <VStack justifyContent="center">
                <Text color="#e5e5e5" bold>
                  {t('common:languageSetting')}
                </Text>
              </VStack>
              <Spacer />
              <Icon name="chevron-forward-outline" size={30} color="#525252" />
            </HStack>
          </Box>
        </TouchableOpacity>
        <Box
          style={{marginTop: 10, marginBottom: 3}}
          w={
            Dimensions.get('window').width -
            (10 / 100) * Dimensions.get('window').width
          }
          py={2}
          px={3}
          bgColor={'rgba(147, 147, 147, 0.3)'}
          rounded="lg">
          <HStack space={4} justifyContent="space-between">
            <Icon name="notifications" size={30} color="#ecfeff" />
            <VStack justifyContent="center">
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color="#e5e5e5"
                bold>
                {t('common:notifications')}
              </Text>
            </VStack>
            <Spacer />
            <Switch
              value={localNotificationState}
              onValueChange={e => {
                setNotification(e);
                setLocalNotificationState(e);
              }}
              size="sm"
            />
          </HStack>
        </Box>
        <Button
          onPress={e => {
            PushNotification.getScheduledLocalNotifications(e => {
              console.log(e);
            });
          }}>
          asdsda
        </Button>
      </Box>
    </View>
  );
};
const mapStateToProps = function (state) {
  return {
    eventsState: state.events.events,
    notification: state.notifications.notification,
  };
};
export default connect(mapStateToProps)(SettingStackScreen);
