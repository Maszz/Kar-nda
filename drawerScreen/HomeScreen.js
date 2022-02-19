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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DayScreen from './DayScreen'
import MonthScreen from './MonthScreen'
import WeekScreen from './WeekScreen'
import YearScreen from './YearScreen'
import { useTranslation } from 'react-i18next';
import BriefLayout from './briefOne'
import Agendar from './Agendar'
const Tab = createMaterialTopTabNavigator();


const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

const HomeScreen = () => {
    const { t } = useTranslation();

    return (
        <Tab.Navigator screenOptions={{ swipeEnabled: false }} initialRouteName="MonthScreen">
            <Tab.Screen name="DayScreen" component={DayScreen} options={{ title: `${t("common:day")}` }} />
            <Tab.Screen name="WeekScreen" component={WeekScreen} options={{ title: `${t("common:week")}` }} />
            <Tab.Screen name="MonthScreen" component={MonthScreen} options={{ title: `${t("common:month")}` }} />
            <Tab.Screen name="YearScreen" component={YearScreen} options={{ title: `${t("common:year")}` }} />
            <Tab.Screen name="testScreen" component={Agendar} options={{ title: `${t("common:test")}` }} />
            <Tab.Screen name="Brief" component={BriefLayout} options={{ title: `${t("common:test")}` }} />


        </Tab.Navigator>
    );
}


export default HomeScreen