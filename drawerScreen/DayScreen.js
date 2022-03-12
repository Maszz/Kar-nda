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
import ActionButton from 'react-native-action-button';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state/index';
import * as RNLocalize from 'react-native-localize';
import ActionButtomComp from '../components/ActionButton';
const DayScreen = props => {
  const [eventCard, setEventCard] = useState([]);
  const eventsState = useSelector(state => state.events);

  useEffect(() => {
    const tempArr = [];
    const timeZone = RNLocalize.getTimeZone();

    for (const event of eventsState.events) {
      const currentDate = moment(new Date(Date.now()))
        .tz(timeZone)
        .format()
        .split('T')[0];
      if (
        currentDate == moment(event.start).tz(timeZone).format().split('T')[0]
      ) {
        tempArr.push(event);
      }
    }
    console.log('THis is temp arr ', tempArr);
    setEventCard(tempArr);
  }, [eventsState]);
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
          const timeZone = RNLocalize.getTimeZone();
          for (const event of eventsState.events) {
            if (
              moment(e).tz(timeZone).format().split('T')[0] ==
              moment(event.start).tz(timeZone).format().split('T')[0]
            ) {
              tempArr.push(event);
            }
          }
          setEventCard(tempArr);
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
              <TouchableOpacity keyExtractor={(item, index) => `${index}`}>
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
          <TouchableOpacity>
            <Box
              width={Dimensions.get('window').width - 50}
              height={75}
              border="1"
              borderRadius="2xl"
              style={{backgroundColor: '#7CC2FF', marginBottom: 20}}></Box>
          </TouchableOpacity>
        </VStack>
      </VStack>
      <ActionButtomComp />
    </View>
  );
};

const styles = StyleSheet.create({
  bgcolor: {
    backgroundColor: '#1F2937',
  },
});

export default DayScreen;
