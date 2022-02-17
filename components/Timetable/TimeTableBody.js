import * as React from 'react';
import {View, Text, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Calendar} from 'react-native-big-calendar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {ZStack} from 'native-base';
const eventNotes = (
  <View style={{marginTop: 3}}>
    <Text style={{fontSize: 10, color: 'white'}}>
      Phone number: 555-123-4567{' '}
    </Text>
    <Text style={{fontSize: 10, color: 'white'}}>
      {' '}
      Arrive 15 minutes early{' '}
    </Text>
  </View>
);
const TimeTableBody = props => {
  return (
    <Calendar
      headerContainerStyle={{flex: 1, display: 'none'}}
      events={props.events}
      height={Dimensions.get('window').height - 50}
      onPressEvent={e => {
        console.log('click event', e);
      }}
      date={props.currentDate}
      mode="day"
      swipeEnabled={false}
      showTime={false}
      isRTL={false}
      showAllDayEventCell={false}
      onChangeDate={a => {
        console.log(a);
      }}
      onPressDateHeader={a => {
        console.log('press date header', a);
      }}
    />
  );
};

export default TimeTableBody;
