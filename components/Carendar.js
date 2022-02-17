import React, { useEffect, useState } from 'react';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { View } from 'react-native';
// import Modal from './Modal';
import { Modal, Center, Button, FormControl, Input, Text } from 'native-base';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import CalendarModal from './Modal';
const calendarComponent = ({ markedDates }) => {
  const [globalMarkedDates, setGlobalMarkedDates] = useState(markedDates);
  const [calendarSelector, setcalendarSelector] = useState('a');
  const [prevSelected, setPrevSelected] = useState('');

  const dispatch = useDispatch();

  const { onCalendarDayPress } = bindActionCreators(
    actionCreators.calendarModalActionCreator,
    dispatch,
  );

  /**
   * `onChangeSelectedDate` and `OndeSelectedDates` active when user `onPress` day from CalendarList
   * `onChangeSelectedDate` add date from {calendarSelector} to {globalMarkedDates}
   * `OndeSelectedDates` remove {prevSelected} form {globalMarkedDates}
   */

  const onChangeSelectedDate = day => {
    let newGlobalMarkedDates = {};
    Object.assign(newGlobalMarkedDates, globalMarkedDates);
    newGlobalMarkedDates[[day['dateString']]] = { selected: true };
    setGlobalMarkedDates(newGlobalMarkedDates);
  };

  const OndeSelectedDates = () => {
    if (!(prevSelected.toString() == calendarSelector.toString())) {
      let newGlobalMarkedDates = {};
      Object.assign(newGlobalMarkedDates, globalMarkedDates);
      delete newGlobalMarkedDates[[prevSelected]];
      setGlobalMarkedDates(newGlobalMarkedDates);
    }
  };

  useEffect(() => {
    OndeSelectedDates();
  }, [prevSelected]);

  return (
    <View>
      <CalendarList
        // Callback which gets executed when visible months change in scroll view. Default = undefined
        onVisibleMonthsChange={months => {
          console.log('now these months are visible', months);
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={12}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={12}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        onDayPress={day => {
          setPrevSelected(calendarSelector);

          setcalendarSelector([day['dateString']]);
          // setVisible(true);
          // setShowModal(true);
          onCalendarDayPress(true);
          if (prevSelected != calendarSelector) {
            onChangeSelectedDate(day);
          }
        }}
        markedDates={markedDates}
      />
      <CalendarModal />
    </View>
  );
};

export default calendarComponent;
