import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-big-calendar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Modal from '../components/Modal';
import dayjs from 'dayjs';
import MonthNameComponent from '../components/MonthName';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

import { Center, View, Text } from 'native-base';

const SettingScreen = () => {

  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
  const monthCalendarState = useSelector(state => state.monthCalendar);
  const dispatch = useDispatch();
  const { onSwipeMonthChange } = bindActionCreators(
    actionCreators.monthCalendarActionCreator,
    dispatch,
  );
  const { events } = useSelector(state => state.events);
  const [passingEvent, setPassingEvent] = useState([])
  const monthNames = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    let tempList = [];
    console.log(events)

    for (const event of events) {
      if (typeof event.start == 'string') {
        let tempObj = {}
        Object.assign(tempObj, event);
        tempObj["start"] = new Date(event.start)
        tempObj["end"] = new Date(event.end)
        tempList.push(tempObj);


      }
      else {
        console.log("IN else")

        tempList.push(event);


      }

    }
    console.log("final templist", tempList)
    setPassingEvent(tempList)
    console.log("This is Passing Event", passingEvent)

    onSwipeMonthChange(monthNames[currentDate.getMonth()], currentDate.getFullYear())

  }, [events, currentDate]);

  return (
    <View padding={3} >
      {/* <Center style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear()}
        </Text>
      </Center> */}

      <Calendar
        events={passingEvent}
        height={Dimensions.get('window').height - 130}
        onPressEvent={e => {
          console.log('click event', e);
        }}
        date={currentDate}
        mode="month"
        swipeEnabled={true}
        showTime={false}
        isRTL={false}
        showAllDayEventCell={false}
        onChangeDate={a => {
          console.log(a);
          if (!(currentDate.getMonth() === a[0].getMonth())) {
            setCurrentDate(a[0]);
          }

          console.log(currentDate);
        }}
        onPressDateHeader={a => {
          console.log('press date header', a);
        }}
      />
    </View >
  );
};

export default SettingScreen;
