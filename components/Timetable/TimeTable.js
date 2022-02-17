import React, {useState} from 'react';
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
import TimeTableBody from './TimeTableBody';

const TimeTable = props => {
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
  return (
    <View>
      <CalendarStrip
        scrollable
        selectedDate={new Date(Date.now())}
        style={{height: 90, paddingTop: 10, marginBottom: 10}}
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: 'white',
        }}
        calendarColor={'#3343CE'}
        onDateSelected={e => {
          console.log(e);
          setCurrentDate(e);
        }}
        calendarHeaderStyle={{color: 'white'}}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        // iconContainer={{flex: 0.1}}
      />
      <TimeTableBody currentDate={currentDate} events={props.events} />
    </View>
  );
};

export default TimeTable;
