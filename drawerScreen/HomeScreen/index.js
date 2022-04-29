import CalendarComponent from '../../components/Carendar';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Spinner, Heading} from 'native-base';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MonthScreen from './MonthScreen';
import YearScreen from './YearScreen';
import {useTranslation} from 'react-i18next';
import DayScreen from './DayScreen';
import Agendar from './WeekScreen';
import Diary from '../../stackScreens/Diary';
import AddEventScreen from '../../stackScreens/AddEventsScreen';
import DairyModal from '../../stackScreens/DairyModal';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state/index';
import ActionButton from '../../components/ActionButton';
import EventModal from '../../stackScreens/eventModal';
import AnimatedLoader from 'react-native-animated-loader';
import WeekSummaryScreen from '../../stackScreens/weekSummaryScreen';
import {Styles} from '../../styles';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreenStack" component={HomeScreen} />
      <Stack.Screen
        name="DairyScreen"
        component={Diary}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddEventScreen"
        component={AddEventScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DairyModal"
        component={DairyModal}
        options={{
          presentation: 'fullScreenModal',
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name="EventModal"
        component={EventModal}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WeekSummary"
        component={WeekSummaryScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {setStackNavigation} = bindActionCreators(
    actionCreators.stackNavigationActionCreator,
    dispatch,
  );
  useEffect(() => {
    setStackNavigation(navigation);
  }, []);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
          // tabBarContentContainerStyle: {backgroundColor: '#1F2937'},
          // tabBarLabelStyle: {color: '#6B7280'},
          tabBarIndicatorStyle: {backgroundColor: '#4AA9FF', height: 3},
          tabBarStyle: {backgroundColor: '#1F2937'},
          tabBarInactiveTintColor: '#6B7280',
          tabBarActiveTintColor: '#ffff',
          lazy: true,
          lazyPlaceholder: () => {
            return (
              <View
                space={2}
                alignItems="center"
                justifyContent="center"
                style={{
                  flex: 1,
                  backgroundColor: Styles.globalStyles.primaryColor,
                }}>
                <Spinner accessibilityLabel="Loading posts" />
                <Heading color="primary.500" fontSize="md">
                  Loading
                </Heading>
              </View>
            );
          },
        }}
        initialRouteName="MonthScreen">
        <Tab.Group>
          <Tab.Screen
            name="DayScreen"
            component={DayScreen}
            options={{
              title: `${t('common:day')}`,
            }}
          />
          <Tab.Screen
            name="WeekScreen"
            component={Agendar}
            options={{
              title: `${t('common:week')}`,
            }}
          />
          <Tab.Screen
            name="MonthScreen"
            component={MonthScreen}
            options={{title: `${t('common:month')}`}}
          />
          <Tab.Screen
            name="YearScreen"
            component={YearScreen}
            options={{title: `${t('common:year')}`}}
          />
        </Tab.Group>
        {/* <Tab.Screen
        name="testScreen"
        component={MonthNew}
        options={{title: `${t('common:test')}`}}
      /> */}
        {/* <Tab.Screen
        name="Brief"
        component={Day}
        options={{title: `${t('common:test')}`}}
      /> */}
      </Tab.Navigator>

      <ActionButton />
    </>
  );
};

export default StackScreen;
