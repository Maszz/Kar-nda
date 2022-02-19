import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-big-calendar';
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
import { ZStack, Box } from 'native-base';
import TimeTableBody from './TimeTableBody';

const TimeTable = props => {
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
  return (
    <View>
      <CalendarStrip
        scrollable
        selectedDate={new Date(Date.now())}
        style={{ height: 90, paddingTop: 10, marginBottom: 10 }}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        style={{ height: 65, paddingHorizontal: 5 }}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: 'white',
        }}
        calendarColor={'#4aa9ff'}
        onDateSelected={e => {
          console.log(e);
          setCurrentDate(e);
        }}
        highlightDateNameStyle={{ color: 'red' }}
        highlightDateNumberStyle={{ color: 'red' }}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        calendarHeaderStyle={{ color: 'white', display: 'none' }}
        iconContainer={{ flex: 0.1 }}
      />
      <TimeTableBody currentDate={currentDate} events={props.events} />
    </View>
  );
};

export default TimeTable;
