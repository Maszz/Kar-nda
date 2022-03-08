import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DebugScreen from './DebugScreen';
import {useTranslation} from 'react-i18next';
import SettingScreen from './SettingScreen';
import HomeScreen from './HomeScreen';

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

/**
 * Main Navigation of the App create routing to another ScreenComponent.
 * @navigationType `DrawerNavigator`
 *
 * @Component
 * `Drawer.Navigator`,
 * `Drawer.Screen`
 */
const DrawerScreenComponent = () => {
  const {t} = useTranslation();

  const [currentDate, setCurrentDate] = useState({day: 0, month: 0, year: 0});
  const month = [
    'january',
    'febuary',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  useEffect(() => {
    let tempObj = {};
    const currenDate = new Date(Date.now());
    tempObj.day = currenDate.getDate();
    tempObj.month = currenDate.getMonth();
    tempObj.year = currenDate.getFullYear();
    setCurrentDate(tempObj);
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Calendar"
        r
        component={HomeScreen}
        // options={{headerShown: false}}
        options={{
          title: `${t('common:calendar')}`,
          headerTitle: `${currentDate.day} ${t(
            `month:${month[currentDate.month]}`,
          )} ${currentDate.year}`,
        }}
      />
      {/* <Drawer.Screen
        name="Timer"
        component={TimerScreen}
        options={{title: `${t('common:timer')}`}}
      /> */}

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
        options={{headerShown: false, title: 'Debug'}}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{headerShown: false, title: `${t('common:setting')}`}}
      />
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
