import React, {useEffect, useState} from 'react';

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {View} from 'react-native';
// import Modal from './Modal';
import {Modal, Center, Button, FormControl, Input, Text} from 'native-base';
import {Dimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import CalendarModal from './Modal';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {useSelector, connect} from 'react-redux';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';

const calendarComponent = ({markedDates, tabNavi, setSelectedDate}) => {
  const [globalMarkedDates, setGlobalMarkedDates] = useState(markedDates);
  const [calendarSelector, setcalendarSelector] = useState('a');
  const [prevSelected, setPrevSelected] = useState('');

  // const dispatch = useDispatch();

  // const {setSelectedDate} = bindActionCreators(
  //   actionCreators.selectedDateActionCreator,
  //   dispatch,
  // );

  /**
   * `onChangeSelectedDate` and `OndeSelectedDates` active when user `onPress` day from CalendarList
   * `onChangeSelectedDate` add date from {calendarSelector} to {globalMarkedDates}
   * `OndeSelectedDates` remove {prevSelected} form {globalMarkedDates}
   */

  const onChangeSelectedDate = day => {
    let newGlobalMarkedDates = {};
    Object.assign(newGlobalMarkedDates, globalMarkedDates);
    newGlobalMarkedDates[[day['dateString']]] = {selected: true};
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
    <View style={{backgroundColor: '#00000'}}>
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
          console.log(day);
          // setVisible(true);
          // setShowModal(true);
          // onCalendarDayPress(true);
          const date = moment(new Date(day['dateString'])).tz(
            RNLocalize.getTimeZone(),
          );

          setSelectedDate(date);
          console.log(date);
          tabNavi.navigate('DayScreen');

          if (prevSelected != calendarSelector) {
            onChangeSelectedDate(day);
          }
        }}
        markedDates={markedDates}
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
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red',
          agendaKnobColor: 'blue',
        }}
      />
      <CalendarModal />
    </View>
  );
};

const mapDispatchToProps = {
  setSelectedDate: actionCreators.selectedDateActionCreator.setSelectedDate,
};
export default connect(null, mapDispatchToProps)(calendarComponent);
