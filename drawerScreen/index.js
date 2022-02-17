import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DebugScreen from './DebugScreen';
import TimerScreen from './TimerScreen';
import CaledarScreen from './CalendarScreen';
import TestScreen from './TestScreen';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AllEventScreen from './AllEventScreen';
import AllTodoListScreen from './AllTodoListScreen';
import TestScreen2 from './TestScreen2';
import SettingScreen from './SettingScreen';
function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

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


  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Calendar"
        component={CaledarScreen}
        // options={{headerShown: false}}
        options={{ title: `${t('common:calendar')}` }}
      />
      <Drawer.Screen
        name="Timer"
        component={TimerScreen}
        options={{ title: `${t('common:timer')}` }}
      />

      <Drawer.Screen
        name="All to do list "
        component={Article}
        options={{ title: `${t('common:allTodoList')}` }}
      />

      <Drawer.Screen
        name="All Event"
        component={AllEventScreen}
        options={{ title: `${t('common:allEvent')}` }}
      />
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

      <Drawer.Screen name="Test" component={TestScreen} />
      <Drawer.Screen name="Test2" component={TestScreen2} options={{ title: "tet", headerTitle: monthCalendarState.month + ' ' + monthCalendarState.year }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerScreenComponent;
