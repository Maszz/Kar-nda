import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Selector from './LanguageSelectorScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingStackScreen from './SettingStackScreen';
import {useTranslation} from 'react-i18next';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Button, IconButton} from 'native-base';
const Stack = createNativeStackNavigator();

import Icon from 'react-native-vector-icons/Ionicons';

const SettingScreen = props => {
  const {t} = useTranslation();
  const test = () => props.navigation.navigate('Calendar');

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingStackScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1F2937',
          },
          headerTintColor: '#ffff',
          headerLeft: () => {
            return (
              <Button variant="unstyled" onPress={() => test()}>
                <Icon name="menu" size={20} color="rgb(82,78,183)" />
              </Button>
            );
          },
          title: `${t('common:setting')}`,
        }}
      />
      <Stack.Screen
        name="Language"
        component={Selector}
        options={{
          title: t('common:language'),
          headerStyle: {
            backgroundColor: '#1F2937',
          },
          headerTitleStyle: {color: 'white'},
        }}
      />
    </Stack.Navigator>
  );
};
export default SettingScreen;
