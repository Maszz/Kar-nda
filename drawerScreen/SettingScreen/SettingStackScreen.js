import React, {useEffect} from 'react';

import {View, Button} from 'native-base';
import {TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import ListComp from '../../components/listComponent';
import {ListBox, Line, ListItem} from '../../components/customList';
import Icon from 'react-native-vector-icons/Ionicons';
import {settingScreenItem} from '../../Constant/index';
import PushNotification from 'react-native-push-notification';
import {useTranslation} from 'react-i18next';

const SettingStackScreen = props => {
  const {t} = useTranslation();

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelchannelName: 'test Channel',
    });
  };
  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Clicked',
      message: 'payload',
      userInfo: {Test: 'TEst'},
    });
  };

  const scheduleNotifications = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Clicked',
      message: 'payload',
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true,
    });
  };
  useEffect(() => {
    createChannels();
    console.log('create channel');
  }, []);
  return (
    <View
      space={4}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#1F2937',
      }}>
      <Button
        style={{marginTop: 20}}
        onPress={() => {
          props.navigation.navigate('Language');
        }}>
        {t('common:languageSetting')}
      </Button>
      <Button
        style={{marginTop: 20}}
        onPress={() => {
          handleNotification();
        }}>
        Notification
      </Button>
    </View>
  );
};
export default SettingStackScreen;
