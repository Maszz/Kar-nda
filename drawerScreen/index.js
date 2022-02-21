import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { ZStack } from 'native-base'
import DebugScreen from './DebugScreen';
import TimerScreen from './TimerScreen';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SettingScreen from './SettingScreen';
import HomeScreen from './HomeScreen';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();



const DrawerScreenComponent = () => {
  const { t } = useTranslation();
  const settingDrawer = useSelector(state => state.settingDrawer);
  const monthCalendarState = useSelector(state => state.monthCalendar);
  const [currentDate, setCurrentDate] = useState({ day: 0, month: 0, year: 0 });
  const month = ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]


  useEffect(() => {
    let tempObj = {}
    const currenDate = new Date(Date.now())
    tempObj.day = currenDate.getDate()
    tempObj.month = currenDate.getMonth()
    tempObj.year = currenDate.getFullYear()
    setCurrentDate(tempObj)

  }, [])
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Calendar" r
        component={HomeScreen}
        // options={{headerShown: false}}
        options={{ title: `${t('common:calendar')}`, headerTitle: `${currentDate.day} ${t(`month:${month[currentDate.month]}`)} ${currentDate.year}` }}
      />
      <Drawer.Screen
        name="Timer"
        component={TimerScreen}
        options={{ title: `${t('common:timer')}` }}
      />

      {/* <Drawer.Screen
        name="All to do list "
        component={Article}
        options={{ title: `${t('common:allTodoList')}` }}
      /> */}

      {/* <Drawer.Screen
        name="All Event"
        component={AllEventScreen}
        options={{ title: `${t('common:allEvent')}` }}
      /> */}
      <Drawer.Screen
        name="Setting Test"
        component={DebugScreen}
        options={{ headerShown: false, title: 'Debug' }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false, title: `${t('common:setting')}` }}
      />

      {/* <Drawer.Screen name="Test" component={TestScreen} />
      <Drawer.Screen name="Test2" component={TestScreen2} options={{ title: "tet", headerTitle: monthCalendarState.month + ' ' + monthCalendarState.year }}
      /> */}

    </Drawer.Navigator>

  );
};
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default DrawerScreenComponent;