import React, {useEffect, useRef, useState} from 'react';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import {
  Button,
  Box,
  FormControl,
  Stack,
  View,
  Text,
  Input,
  WarningOutlineIcon,
  TextArea,
  HStack,
  Container,
  VStack,
  Spacer,
  Divider,
} from 'native-base';
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch, useSelector, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import * as RNLocalize from 'react-native-localize';
import {Styles} from '../styles';
import {useTranslation} from 'react-i18next';

const WeekSummaryScreen = ({eventsState}) => {
  const timeZone = RNLocalize.getTimeZone();
  const {t} = useTranslation();

  const [date, setDate] = useState(
    moment(new Date(Date.now()))
      .tz(timeZone)
      .set({hour: 0, minute: 0, second: 0, millisecond: 0}),
  );

  const [weekDate, setWeekDate] = useState(undefined);
  const [inRangeEvents, setInRangeEvents] = useState([]);
  useEffect(() => {
    // console.log(eventsState.events);
    console.log(date);
    // console.log(new Date(Date.now()).toISOString());
    const tempArr = [];
    for (const event of eventsState.events) {
      //   console.log(moment(event.start).diff(date, 'day'));r
      if (
        moment(event.start).diff(date, 'day') <= 7 &&
        moment(event.start).diff(date, 'day') >= 0
      ) {
        tempArr.push(event);
      }
    }
    const sortedArr = tempArr.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
    console.log(sortedArr);
    setInRangeEvents(sortedArr);

    const tempWeekArr = [];
    // tempWeekArr.push(date);
    const tempday = moment(date);

    for (let i = 0; i < 7; i++) {
      const tempdate = moment(tempday);
      tempWeekArr.push(tempdate);
      tempday.add(1, 'day');
    }

    console.log(tempWeekArr);
    setWeekDate(tempWeekArr);
    console.log(
      'temp',
      moment('2022-04-02T22:15:21.758Z').tz(timeZone).format(),
    );
    console.log();
  }, []);
  return (
    <ScrollView style={{backgroundColor: '#334155', padding: 20}}>
      <Box
        style={{
          backgroundColor: 'rgba(31, 41, 55, 0.5)',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 20,
        }}
        width="90%"
        minHeight={100}>
        <Text color={'#4AA9FF'}>{t('common:today')}</Text>
        <Divider />
        <Box style={{padding: 10}}>
          {inRangeEvents.map((event, j) => {
            if (
              moment(event.start).tz(timeZone).format().split('T')[0] ==
              weekDate[0].format().split('T')[0]
            ) {
              return <Text style={{color: 'white'}}>{event.title}</Text>;
            }
          })}
        </Box>
      </Box>

      {weekDate?.map((v, i) => {
        console.log(v.format('LL'));

        if (i != 0) {
          return (
            <Box
              key={i}
              style={{
                padding: 10,
                alignSelf: 'center',
              }}
              width="90%">
              <Text fontSize={'2xl'} style={{color: 'white'}}>
                {v.format('LL')}
              </Text>
              {inRangeEvents.map((event, j) => {
                if (
                  moment(event.start).tz(timeZone).format().split('T')[0] ==
                  v.format().split('T')[0]
                ) {
                  return <Text style={{color: 'white'}}>{event.title}</Text>;
                }
              })}
            </Box>
          );
        }
      })}
    </ScrollView>
  );
};

const mapStateToProps = function (state) {
  return {
    eventsState: state.events,
  };
};

export default connect(mapStateToProps)(WeekSummaryScreen);
