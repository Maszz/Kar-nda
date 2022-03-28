import React, {useState, useEffect} from 'react';
import {View, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Calendar} from 'react-native-big-calendar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {ZStack, Box, VStack, Divider, Text, Container} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state/index';
import * as RNLocalize from 'react-native-localize';

const DayScreen = props => {
  const navigationState = useSelector(state => state.StackNavigation);
  const [eventCard, setEventCard] = useState([]);
  const timeZone = RNLocalize.getTimeZone();
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date(Date.now())).tz(timeZone),
  );
  const [isMounted, setIsMounted] = useState(false);
  const eventsState = useSelector(state => state.events);
  const dayUserMemoState = useSelector(state => state.dayUserMemo);
  // const [dairys, setDairys] = useState({});
  const [selectedDairy, setSelectedDairy] = useState({
    title: '',
    dairyText: '',
    date: '',
  });
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
  useEffect(() => {
    const timeZone = RNLocalize.getTimeZone();
    const currentDate = moment(new Date(Date.now()))
      .tz(timeZone)
      .format()
      .split('T')[0];
    // if (!isMounted) {
    const tempArr = [];
    for (const event of eventsState.events) {
      if (
        currentDate == moment(event.start).tz(timeZone).format().split('T')[0]
      ) {
        tempArr.push(event);
      }
    }
    console.log('THis is temp arr ', tempArr);
    setEventCard(tempArr);

    // setDairys(dayUserMemoState.dairy);

    const dairyKeys = Object.keys(dayUserMemoState.dairy);
    for (const key of dairyKeys) {
      if (key == selectedDate.toISOString().split('T')[0]) {
        setSelectedDairy(dayUserMemoState.dairy[key]);
        break;
      }
      setSelectedDairy({title: '', dairyText: '', date: ''});
    }
  }, [eventsState, dayUserMemoState]);
  return (
    <View style={{backgroundColor: '#1F2937', flex: 1}}>
      <CalendarStrip
        scrollable
        selectedDate={moment(Date.now()).tz(RNLocalize.getTimeZone())}
        calendarAnimation={{type: 'sequence', duration: 30}}
        style={{height: 50, paddingHorizontal: 5, marginTop: 25}}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: 'white',
        }}
        calendarColor={styles.bgcolor.backgroundColor}
        dayContainerStyle={{
          backgroundColor: '#1F2937',
          width: 34,
          height: 50,
          borderRadius: 10,
        }}
        onDateSelected={e => {
          let tempArr = [];
          for (const event of eventsState.events) {
            if (
              moment(e).tz(timeZone).format().split('T')[0] ==
              moment(event.start).tz(timeZone).format().split('T')[0]
            ) {
              tempArr.push(event);
            }
          }
          setEventCard(tempArr);
          const date = moment(e).tz(timeZone);
          setSelectedDate(date);

          // set dairy.
          const dairyKeys = Object.keys(dayUserMemoState.dairy);
          for (const key of dairyKeys) {
            if (key == date.toISOString().split('T')[0]) {
              setSelectedDairy(dayUserMemoState.dairy[key]);
              break;
            }
            setSelectedDairy({title: '', dairyText: '', date: ''});
          }
        }}
        highlightDateNameStyle={{color: 'white'}}
        highlightDateNumberStyle={{color: 'white'}}
        highlightDateContainerStyle={{backgroundColor: '#7CC2FF'}}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        calendarHeaderStyle={{color: 'white', display: 'none'}}
        iconContainer={{flex: 0.1, display: 'none'}}
      />

      <VStack style={{padding: 25}}>
        <Text style={{color: 'white', marginBottom: 5}}>Events</Text>
        <Box
          style={{backgroundColor: 'white'}}
          width={Dimensions.get('window').width - 50}
          height={0.5}
        />
        <ScrollView
          height={166}
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {eventCard.length === 0 && (
            <TouchableOpacity>
              <Box
                width={Dimensions.get('window').width - 50}
                height={75}
                border="1"
                borderRadius="2xl"
                style={{backgroundColor: '#7CC2FF', marginBottom: 15}}>
                <VStack style={{padding: 10}}>
                  <Text
                    style={{fontWeight: 'bold', color: 'white', fontSize: 18}}>
                    To day no Event for You
                  </Text>
                  <Text style={{color: 'white', fontSize: 13}}>
                    use This for relex your self
                  </Text>
                </VStack>
              </Box>
            </TouchableOpacity>
          )}

          {eventCard.map((item, i) => {
            return (
              <TouchableOpacity key={i} keyExtractor={(item, i) => `${index}`}>
                <Box
                  width={Dimensions.get('window').width - 50}
                  height={75}
                  border="1"
                  borderRadius="2xl"
                  style={{backgroundColor: '#7CC2FF', marginBottom: 15}}>
                  <VStack style={{padding: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{color: 'white', fontSize: 13}}>
                      {item.description}
                    </Text>
                  </VStack>
                </Box>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={{color: 'white', marginTop: 10, marginBottom: 5}}>
          List To do
        </Text>
        <Box
          style={{backgroundColor: 'white', marginBottom: 20}}
          width={Dimensions.get('window').width - 50}
          height={0.5}
        />
        <TouchableOpacity>
          <Box
            width={Dimensions.get('window').width - 50}
            height={75}
            border="1"
            borderRadius="2xl"
            style={{backgroundColor: '#7CC2FF', marginBottom: 10}}></Box>
        </TouchableOpacity>
        <VStack>
          <Text style={{color: 'white', marginBottom: 5}}>Dairy</Text>
          <Box
            style={{backgroundColor: 'white', marginBottom: 20}}
            width={Dimensions.get('window').width - 50}
            height={0.5}
          />
          <TouchableOpacity
            onPress={() => {
              navigationState.navigation.navigate('DairyModal', {
                date: selectedDate.toISOString().split('T')[0],
              });
            }}>
            <Box
              width={Dimensions.get('window').width - 50}
              height={75}
              border="1"
              borderRadius="2xl"
              style={{
                backgroundColor: '#7CC2FF',
                marginBottom: 20,
                padding: 10,
              }}>
              <VStack>
                <Text style={{color: 'white'}}>
                  {selectedDairy.title == ''
                    ? `To day you don't wrote dairy yet.`
                    : `${selectedDairy.title}`}
                </Text>
                <Text style={{color: 'white'}}>
                  {`${days[selectedDate.day()]} ${selectedDate.date()} ${
                    months[selectedDate.month()]
                  } ${selectedDate.year()}`}
                </Text>
              </VStack>
            </Box>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  bgcolor: {
    backgroundColor: '#1F2937',
  },
});

export default DayScreen;
