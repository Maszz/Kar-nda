import React, {useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

import ReduxScreen from './ReduxScreen';
const Stack = createStackNavigator();

const PageStack = () => {
  const {t} = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0085E6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{title: 'Main Screen'}}
      />

      <Stack.Screen
        name="ReduxScreen"
        component={ReduxScreen}
        options={{title: 'Redux Screen'}}
      />
    </Stack.Navigator>
  );
};

export default PageStack;
