import React, {useEffect, useRef, useState} from 'react';

import {Button, Box, View, Text, HStack, VStack, Spacer} from 'native-base';
import {Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch, useSelector, connect} from 'react-redux';
import {actionCreators} from '../state/index';
import * as RNLocalize from 'react-native-localize';
import {useTranslation} from 'react-i18next';

const EventModal = ({
  navigation,
  route,
  eventsState,
  navigationState,
  removeEvent,
}) => {
  const {t} = useTranslation();
  const timeZone = RNLocalize.getTimeZone();
  const [selectedEvent, setSelectedEvent] = useState({
    start: moment(new Date()).tz(RNLocalize.getTimeZone()),
    end: moment(new Date()),
    title: '',
    description: '',
    location: '',
  });
  selectedEvent.start.hour();
  selectedEvent.start.minute();
  const {date, index} = route.params;
  const days = [
    t('common:sun'),
    t('common:mon'),
    t('common:tue'),
    t('common:wed'),
    t('common:thu'),
    t('common:fri'),
    t('common:sat'),
  ];

  const months = [
    t('month:january'),
    t('month:february'),
    t('month:march'),
    t('month:april'),
    t('month:may'),
    t('month:june'),
    t('month:july'),
    t('month:august'),
    t('month:september'),
    t('month:october'),
    t('month:november'),
    t('month:december'),
  ];
  const timeFormatter = date => {
    return date.format('h:mm a');
  };
  useEffect(() => {
    const currentDate = date;
    const tempArr = [];
    console.log(eventsState.events);
    console.log('params :', route.params);
    for (const event of eventsState.events) {
      if (
        currentDate ==
        moment(new Date(event.start)).tz(timeZone).format().split('T')[0]
      ) {
        tempArr.push(event);
      }
    }
    console.log('THis is temp arr ', tempArr);
    const sortedArr = tempArr.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
    const event = sortedArr[index];
    console.log(event);
    const selectedEventDTO = {
      start: moment(new Date(event.start)).tz(RNLocalize.getTimeZone()),
      end: moment(new Date(event.end)).tz(RNLocalize.getTimeZone()),
      title: event.title,
      description: event.description,
      location: event.location,
      notificationBeforeEvent: event.notificationBeforeEvent,
    };
    setSelectedEvent(selectedEventDTO);
  }, [date, index]);
  return (
    <View style={{backgroundColor: '#1F2937'}} height="100%">
      <Box
        style={{
          alignSelf: 'flex-end',
          paddingHorizontal: 25,
          paddingTop: 25,
        }}>
        <Button
          variant="unstyled"
          color="white"
          onPress={() => {
            Alert.alert(
              `${t('common:deleteEvent')}`,
              `${t('common:deleteEventMsg')}`,
              [
                {
                  text: `${t('common:cancel')}`,
                  // onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: `${t('common:yes')}`,
                  onPress: () => {
                    removeEvent(selectedEvent);
                    navigation.goBack();
                  },
                  style: 'default',
                },
              ],
            );
          }}>
          <Text style={{color: 'white'}}>{t('common:delete')}</Text>
        </Button>
      </Box>
      <VStack style={{paddingHorizontal: 50}}>
        <Box
          style={{
            alignItems: 'flex-start',
            marginTop: 30,
          }}>
          <Box
            _text={{
              fontSize: '4xl',
              fontWeight: 'medium',
              color: '#ffff',
              letterSpacing: 'lg',
            }}>
            {selectedEvent.title}
          </Box>
        </Box>
        <Box>
          <HStack space={4} justifyContent="space-between" width="100%">
            <Text style={{color: 'white'}}>
              {`${
                days[selectedEvent.start.day()]
              } ${selectedEvent.start.date()} ${
                months[selectedEvent.start.month()]
              } ${selectedEvent.start.year()}`}
            </Text>
            <Spacer />
            <Text style={{color: 'white'}}>
              {timeFormatter(selectedEvent.start)} -{' '}
              {timeFormatter(selectedEvent.end)}
            </Text>
          </HStack>
        </Box>
        <Box>
          <Box style={{marginTop: 20}}>
            <Box _text={{color: '#ffff', fontSize: 'xl'}}>
              {t('common:description')}
            </Box>
          </Box>

          <Box>
            <Text style={{color: 'white'}}>{selectedEvent.description}</Text>
          </Box>
        </Box>
        <Box>
          <Box style={{marginTop: 20}}>
            <Box _text={{color: '#ffff', fontSize: 'xl'}}>
              {t('common:location')}
            </Box>
          </Box>

          <Box>
            <Text style={{color: 'white'}}>
              {selectedEvent.location == ''
                ? t('common:noLocation')
                : selectedEvent.location}
            </Text>
          </Box>
        </Box>
        <Box>
          <Box style={{marginTop: 20}}>
            <Box _text={{color: '#ffff', fontSize: 'xl'}}>
              {t('common:notifications')}
            </Box>
          </Box>

          <Box>
            <Text style={{color: 'white'}}>
              {t('common:notificationEveventModal')}{' '}
              {selectedEvent.notificationBeforeEvent || '0'}{' '}
              {t('common:minute')}.
            </Text>
          </Box>
        </Box>
      </VStack>
    </View>
  );
};

const mapStateToProps = function (state) {
  return {
    eventsState: state.events,
    navigationState: state.StackNavigation,
  };
};
const mapDispatchToProps = {
  removeEvent: actionCreators.eventsActionCreator.removeEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventModal);
