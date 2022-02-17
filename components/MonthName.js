import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Calendar} from 'react-native-big-calendar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Modal from '../components/Modal';
import dayjs from 'dayjs';

import {Center, View, Text} from 'native-base';

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

const MonthNameComponent = props => {
  return (
    <Center>
      <Text>{monthNames[props.currentMonth]}</Text>
    </Center>
  );
};

export default MonthNameComponent;
