import CalendarComponent from '../components/Carendar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  useDisclose,
  Center,
  Box,
  IconButton,
  HStack,
  Stagger,
  ZStack,
} from 'native-base';
import { useSelector } from 'react-redux';
import Onboarding from '../components/Onboarding'
const CalendarScreen = () => {
  const events = useSelector(state => state.events);
  const formatDate = (e) => {

    let temp = {}
    for (const event of e.events) {
      // console.log(event.start.toISOString())
      if (typeof event.start == "string") {
        let tempKey = event.start.split('T')[0]
        temp[tempKey] = { marked: true, }
        temp[new Date(Date.now()).toISOString().split('T')[0]] = { selected: true }

      }
      else {
        let tempKey = event.start.toISOString().split('T')[0]

        temp[tempKey] = { marked: true }
        temp[new Date(Date.now()).toISOString().split('T')[0]] = { selected: true }

      }
    }

    // e.events.toISOString().split('T')[0]
    return temp
  }

  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    let temp = formatDate(events)
    setMarkedDates(temp)
    console.log(markedDates)
  }, [events])

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <CalendarComponent markedDates={markedDates} />
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          onPress={() => console.log('notes tapped!')}>
          <Icon name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Notifications"
          onPress={() => { }}>
          <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Tasks"
          onPress={() => { }}>
          <Icon name="md-done-all" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};


const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});


export default CalendarScreen;
