import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
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
import Icon from 'react-native-vector-icons/dist/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { ZStack } from 'native-base';
import { TimeTable } from '../components/Timetable';
import { eventsForCalendar } from '../eventsManager/event';
import { useSelector } from 'react-redux';
const EventNotes = (props) => {
  return (
    <View style={{ marginTop: 3 }}>
      <Text style={{ fontSize: 10, color: 'white' }}>
        {props.subHeader}{' '}
      </Text>
      <Text style={{ fontSize: 10, color: 'white' }}>
        {' '}
        {props.description}{' '}
      </Text>
    </View>
  )
};
const TesttingScreen = () => {
  const { events } = useSelector(state => state.events);
  const [passingEvent, setPassingEvent] = useState([])
  const eventNotes = (
    <View style={{ marginTop: 3 }}>
      <Text style={{ fontSize: 10, color: 'white' }}>
        Phone number: 555-123-4567{' '}
      </Text>
      <Text style={{ fontSize: 10, color: 'white' }}>
        {' '}
        Arrive 15 minutes early{' '}
      </Text>
    </View>
  );
  useEffect(() => {
    let tempList = [];
    console.log("TestScreenLog: ", events)
    for (const event of events) {
      if (typeof event.start == 'string') {
        let tempObj = {}
        Object.assign(tempObj, event);
        tempObj["start"] = new Date(event.start)
        tempObj["end"] = new Date(event.end)
        tempObj["children"] = <EventNotes subHeader="subHeader" description="descripotion" />
        console.log(tempObj)
        tempList.push(tempObj);
      }
      else {
        let tempObj = {}
        Object.assign(tempObj, event);
        tempObj["children"] = <EventNotes subHeader="subHeader" description="descripotion" />
        console.log(tempObj)
        tempList.push(tempObj);


      }

    }

    setPassingEvent(tempList)


  }, [events]);
  let datesWhitelist = [
    {
      start: moment(),
      end: moment().add(3, 'days'), // total 4 days enabled
    },
  ];
  let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled
  return (
    <View>
      <TimeTable events={passingEvent} />
    </View>
  );
};

export default TesttingScreen;
