import React, {useState, useEffect} from 'react';
import {View, Box, Switch, Spacer, Text, HStack, VStack} from 'native-base';
import {Dimensions} from 'react-native';
import IoniCons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {useSelector, connect} from 'react-redux';
import {Styles} from '../../styles';
import {actionCreators} from '../../state/index';

const NotificationScreen = ({notificationState, setNotification}) => {
  const {t} = useTranslation();
  const [localNotificationState, setLocalNotificationState] = useState(true);

  useEffect(() => {
    setLocalNotificationState(notificationState);
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#1F2937',
        height: '100%',
        paddingHorizontal: 15,
      }}>
      <Text ml={3} mt={25} color={Styles.globalStyles.textPrimaryColor}>
        Notification
      </Text>
      <Box
        alignSelf={'center'}
        style={{marginTop: 5, marginBottom: 3}}
        w={
          Dimensions.get('window').width -
          (10 / 100) * Dimensions.get('window').width
        }
        py={2}
        px={3}
        bgColor={'rgba(147, 147, 147, 0.3)'}
        rounded="lg">
        <HStack space={4} justifyContent="space-between">
          <IoniCons name="notifications" size={30} color="#ecfeff" />
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
    </View>
  );
};
const mapStateToProps = function (state) {
  return {
    eventsState: state.events.events,
    notificationState: state.notifications.notification,
  };
};

const mapDispatchToProps = {
  setNotification: actionCreators.notificationsActionCreator.setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
