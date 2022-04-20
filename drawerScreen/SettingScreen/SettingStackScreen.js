import React, {useEffect} from 'react';

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
const SettingStackScreen = props => {
  const {t} = useTranslation();
  const notification = useSelector(state => state.notifications.notification);
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

  const scheduleNotifications = () => {
    PushNotification.localNotificationSchedule({
      channelId: 'test-channel',
      title: 'Clicked',
      message: 'payload',
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true,
    });
  };
  const notificationsCallbacks = useCallback(() => {
    if (notification) {
      console.log('True');
      PushNotification.getScheduledLocalNotifications(v => {
        console.log(v);
      });
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
        <TouchableOpacity onPress={() => props.navigation.navigate('Language')}>
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
              onValueChange={e => {
                console.log(e);
                setNotification(e);
              }}
              size="sm"
            />
          </HStack>
        </Box>
      </Box>
    </View>
  );
};
export default SettingStackScreen;
