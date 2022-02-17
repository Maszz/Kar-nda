import React, { useState, useEffect } from 'react';

import {
  Box,
  View,
  Center,
  Button,
  VStack,
  Text,
  Pressable,
  FlatList,
  Actionsheet,
  useDisclose,
  Spacer,
} from 'native-base';
import { TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import ListComp from '../../components/listComponent';
import { ListBox, Line, ListItem } from '../../components/customList';
import Icon from 'react-native-vector-icons/Ionicons';
import { settingScreenItem } from '../../Constant/index';
import PushNotification from 'react-native-push-notification';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { eventsForCalendar } from '../../eventsManager/event'
import dayjs from 'dayjs';


const EventNotes = (props) => {
  return (
    <View style={{ marginTop: 3 }}>
      <Text style={{ fontSize: 10, color: 'black' }}>
        {props.subHeader}{' '}
      </Text>
      <Text style={{ fontSize: 10, color: 'black' }}>
        {' '}
        {props.description}{' '}
      </Text>
    </View>
  )
};
const eventsForCalendar = [
  {
    title: 'Meeting',
    start: new Date(2022, 1, 11, 10, 0),
    end: new Date(2022, 1, 11, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2022, 1, 14, 15, 45),
    end: new Date(2022, 1, 14, 16, 30),
  },
  {
    title: "Doctor's ",
    start: dayjs().set('hour', 13).set('minute', 0).toDate(),
    end: dayjs().set('hour', 14).set('minute', 15).toDate(),
    children: <EventNotes subHeader="subHeader" description="descripotion" />,
  },
  {
    title: "Doctor's ",
    start: new Date(2022, 1, 13, 15, 45),
    end: new Date(2022, 1, 13, 16, 45),
    children: <EventNotes subHeader="subHeader" description="descripotion" />,
  },
  {
    title: "Doctor's ",
    start: new Date(2022, 1, 20, 15, 45),
    end: new Date(2022, 1, 20, 16, 45),
    children: <EventNotes subHeader="subHeader" description="descripotion" />,
  },
  {
    title: 'Meeting',
    start: new Date(2022, 0, 11, 10, 0),
    end: new Date(2022, 0, 11, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2022, 0, 14, 15, 45),
    end: new Date(2022, 0, 14, 16, 30),
  },
];

const SettingStackScreen = props => {
  const events = useSelector(state => state.events);
  const onBoard = useSelector(state => state.onBoard);

  const dispatch = useDispatch();

  const { addEvent, removeEvent, resetEventList } = bindActionCreators(
    actionCreators.eventsActionCreator,
    dispatch,
  );

  const mapaddfordebugonly = () => {
    eventsForCalendar.map(x => {
      addEvent(x)
    })
  }
  const { isOpen, onOpen, onClose } = useDisclose();
  const [touchY, setTouchY] = useState(0);
  const windowHeight = Dimensions.get('window').height;
  const { t } = useTranslation();
  const { setViewedOnboard } = bindActionCreators(
    actionCreators.onBoardActionCreator,
    dispatch,
  );
  const formatDate = (e) => {

    let temp = {}
    for (const event of e.events) {

      // console.log(event.start.toISOString())
      if (typeof event.start == "string") {
        let tempKey = event.start.split('T')[0]
        temp[tempKey] = { marked: true }
      }
      else {
        let tempKey = event.start.toISOString().split('T')[0]
        temp[tempKey] = { marked: true }
      }
    }

    // e.events.toISOString().split('T')[0]
    return temp
  }

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
      userInfo: { Test: 'TEst' },
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
    <ScrollView
      onTouchStart={e => {
        if (windowHeight - (15 / 100) * windowHeight < e.nativeEvent.pageY) {
          setTouchY(e.nativeEvent.pageY);
          console.log(touchY);
        }
      }}
      onTouchEnd={e => {
        if (touchY - e.nativeEvent.pageY > 20 && touchY != 0) {
          onOpen();
          setTouchY(0);
          console.log('Swiped up');
        }
      }}>
      <VStack space={4} alignItems="center">
        <View style={{ marginTop: 40 }}>
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              props.navigation.navigate('Language');
            }}>
            {t('common:languageSetting')}
          </Button>
          <Button
            style={{ marginTop: 20 }}
            onPress={() => {
              handleNotification();
              console.log('wow');
            }}>
            Notification
          </Button>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              scheduleNotifications();
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>scheduleNotifications </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              addEvent()
              console.log("click")
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>test persistor </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              console.log(events)
              console.log(events.events.length)
              console.log(onBoard)
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>console persistor </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              resetEventList()
              console.log("reset")
              console.log(events)
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>reset persistor </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              resetEventList()
              mapaddfordebugonly()
              console.log(events)
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>mapadd persistor </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              removeEvent("events.events[0]")
              console.log(events)
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>remove persistor </Text>
            </Center>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              // console.log(events.events[0].start.toISOString().split('T')[0])
              // console.log(formatDate(events))
              // let toDay = new Date(Date.now()).getDay() + 1
              // let maxdates = new Date(Date.now())
              // maxdates.setDate(maxdates.getDate() + (7 - toDay + 1))
              // let minDate = new Date(Date.now())
              // minDate.setDate(minDate.getDate() - toDay + 1)
              // let day = new Date(2022, 1, 13)
              // console.log(day > minDate && day < maxdates)
              setViewedOnboard("false");
              console.log("setOnboard false")
            }}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text> reset onBoard </Text>
            </Center>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={onOpen}>
            <Center
              w={Dimensions.get('window').width - 20}
              h="10"
              bg="indigo.300"
              rounded="lg"
              shadow={3}>
              <Text>Action Sheet</Text>
            </Center>
          </TouchableOpacity>


          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item>Option 1</Actionsheet.Item>
              <Actionsheet.Item>Option 2</Actionsheet.Item>
              <Actionsheet.Item>Option 3</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </View>
      </VStack>
      <ListBox
        icon={<Icon name="language-sharp" size={30} color="#ecfeff" />}
        onPress={props.navigation}
        items={settingScreenItem.screenItem}
      />
      {/* <Center style={{ marginTop: 20 }}>
        <Box
          w={
            Dimensions.get('window').width -
            (10 / 100) * Dimensions.get('window').width
          }
          minHeight={100}
          bgColor="#404040"
          rounded="lg"
          padding={2}>
          <VStack>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Language');
              }}>
              <ListItem
                settingName="Language setting"
                icon={<Icon name="language-sharp" size={30} color="#ecfeff" />}
              />
            </TouchableOpacity>
            <Line />
            <TouchableOpacity>
              <ListItem
                settingName="Other setting"
                icon={<Icon name="language-sharp" size={30} color="#ecfeff" />}
              />
            </TouchableOpacity>
            <Line />
            <TouchableOpacity>
              <ListItem
                settingName="ActionSheet setting"
                icon={<Icon name="language-sharp" size={30} color="#ecfeff" />}
              />
            </TouchableOpacity>
          </VStack>
        </Box>
      </Center> */}
    </ScrollView>
  );
};
export default SettingStackScreen;
