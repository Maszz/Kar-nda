import CalendarComponent from '../../components/Carendar';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import {useSelector} from 'react-redux';
import ActionButton from '../../components/ActionButton';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

const YearScreen = () => {
  const events = useSelector(state => state.events);

  const formatDate = e => {
    const timeZone = RNLocalize.getTimeZone();
    let temp = {};
    for (const event of e.events) {
      // console.log(event.start.toISOString())
      if (typeof event.start == 'string') {
        let tempKey = moment(event.start).tz(timeZone).format().split('T')[0];
        temp[tempKey] = {marked: true};
        temp[moment(new Date(Date.now())).tz(timeZone).format().split('T')[0]] =
          {selected: true};
      } else {
        let tempKey = event.start.toISOString().split('T')[0];
        temp[tempKey] = {marked: true};
        temp[new Date(Date.now()).toISOString().split('T')[0]] = {
          selected: true,
        };
      }
    }
    // e.events.toISOString().split('T')[0]
    return temp;
  };

  const [markedDates, setMarkedDates] = useState({});
  useEffect(() => {
    let temp = formatDate(events);
    setMarkedDates(temp);
    console.log(markedDates);
  }, [events]);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <CalendarComponent markedDates={markedDates} />
      <ActionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default YearScreen;
