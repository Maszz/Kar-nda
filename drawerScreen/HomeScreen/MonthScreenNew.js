import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Modal from '../../components/Modal';
import MonthNameComponent from '../../components/MonthName';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state/index';

import {Center, View, Text, Box} from 'native-base';
import ActionButton from '../../components/ActionButton';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const SettingScreen = () => {
  return (
    <View style={{backgroundColor: '#1F2937', height: '100%'}}>
      <Calendar
        // Initially visible month. Default = now
        // current={'2012-03-01'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2012-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        // monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={direction => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={false}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={0}
        // Hide day names. Default = false
        hideDayNames={false}
        // Show week numbers to the left. Default = false
        showWeekNumbers={false}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        // renderHeader={date => {
        //   /*Return JSX*/
        // }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
        theme={{
          backgroundColor: '#1F2937',
          calendarBackground: '#1F2937',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: 'white',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'white',
          indicatorColor: 'blue',
          // textDayFontFamily: 'monospace',
          // textMonthFontFamily: 'monospace',
          // textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
      <ActionButton />
    </View>
  );
};

export default SettingScreen;
