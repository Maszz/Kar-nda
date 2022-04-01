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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch, useSelector, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import * as RNLocalize from 'react-native-localize';

const EventModal = ({navigation, route, eventsState}) => {
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
  const [forMattedDate, setFormattedDate] = useState();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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
    };
    setSelectedEvent(selectedEventDTO);
  }, [date, index]);
  return (
    <View style={{backgroundColor: '#1F2937'}} height="100%">
      <VStack style={{paddingHorizontal: 50}}>
        <Box style={{alignSelf: 'flex-start', padding: 15}}>
          <Button
            variant="unstyled"
            color="white"
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: 'white'}}>Back</Text>
          </Button>
        </Box>
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
            <Box _text={{color: '#ffff', fontSize: 'xl'}}>Description</Box>
          </Box>

          <Box>
            <Text style={{color: 'white'}}>{selectedEvent.description}</Text>
          </Box>
        </Box>
        <Box>
          <Box style={{marginTop: 20}}>
            <Box _text={{color: '#ffff', fontSize: 'xl'}}>Location</Box>
          </Box>

          <Box>
            <Text style={{color: 'white'}}>
              {selectedEvent.location || 'no Location set'}
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
  };
};

export default connect(mapStateToProps)(EventModal);
