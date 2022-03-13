import React, {useState, useEffect} from 'react';
import {Dimensions, View, Text} from 'react-native';

import {TimeTable} from '../../components/Timetable';
import {useSelector} from 'react-redux';
import ActionButton from '../../components/ActionButton';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

const EventNotes = props => {
  return (
    <View style={{marginTop: 3}}>
      <Text style={{fontSize: 10, color: 'white'}}>{props.description}</Text>
    </View>
  );
};
const DayScreen = () => {
  const {events} = useSelector(state => state.events);
  const [passingEvent, setPassingEvent] = useState([]);

  useEffect(() => {
    let tempList = [];
    const timeZone = RNLocalize.getTimeZone();

    console.log('TestScreenLog: ', events);
    for (const event of events) {
      if (typeof event.start == 'string') {
        let tempObj = {};
        Object.assign(tempObj, event);
        tempObj['start'] = moment(event.start).tz(timeZone).format();
        tempObj['end'] = moment(event.end).tz(timeZone).format();
        tempObj['children'] = (
          <EventNotes description={event.description} subHeader="subHeader" />
        );
        tempList.push(tempObj);
      } else {
        let tempObj = {};
        Object.assign(tempObj, event);
        tempObj['start'] = event.start;
        tempObj['end'] = event.end;
        tempObj['children'] = (
          <EventNotes subHeader="subHeader" description="descripotion" />
        );
        console.log(tempObj);
        tempList.push(tempObj);
      }
    }

    setPassingEvent(tempList);
  }, [events]);

  let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled
  return (
    <View style={{flex: 1}}>
      <TimeTable events={passingEvent} />
      <ActionButton />
    </View>
  );
};

export default DayScreen;
