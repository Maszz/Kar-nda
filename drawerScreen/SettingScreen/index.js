import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Selector from './LanguageSelectorScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SettingStackScreen from './SettingStackScreen';
import { useTranslation } from 'react-i18next';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Button, IconButton } from 'native-base';
const Stack = createStackNavigator();
import Icon from 'react-native-vector-icons/Ionicons';

const SettingScreen = props => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingStackScreen}
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <Button
                variant="unstyled"
                onPress={() => props.navigation.openDrawer()}>
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
        }}
      />
    </Stack.Navigator>
  );
};
export default SettingScreen;
