import React, {Component, useState, useEffect, useCallback} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from 'react-native-calendars';
import {Divider, Skeleton, VStack, Box, HStack, Spacer} from 'native-base';
import {useSelector, connect} from 'react-redux';

import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {Styles} from '../../styles';

const AgendaComponents = ({eventsState, navigationState}) => {
  const [itemsCard, setItemCard] = useState({});
  // const eventsState = useSelector(state => state.events);
  const [selectedDate, setSelectedDate] = useState(
    moment(Date.now()).tz(RNLocalize.getTimeZone()).format().split('T')[0],
  );

  const renderItem = (reservation, isFirst) => {
    return (
      <TouchableOpacity
        style={[Styles.weekScreenStyles.AgendarStylesProps.item, {height: 70}]}
        onPress={() => {
          navigationState.navigation.navigate('EventModal', {
            date: selectedDate,
            index: reservation.index,
          });
        }}>
        <VStack>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{
              fontSize: 16,
              color: Styles.globalStyles.textPrimaryColor,
              fontWeight: '500',
            }}>
            {reservation.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={{fontSize: 13, color: Styles.globalStyles.textPrimaryColor}}>
            {reservation.description}
          </Text>
          <Box>
            <HStack space={4} style={{justifyContent: 'space-between'}}>
              <Spacer />
              <Box style={{justifyContent: 'flex-end'}}>
                <Text style={{color: Styles.globalStyles.textPrimaryColor}}>
                  {`${reservation.start.format(
                    'h:mm a',
                  )} - ${reservation.end.format('h:mm a')}`}
                </Text>
              </Box>
            </HStack>
          </Box>
        </VStack>
      </TouchableOpacity>
    );
  };
  const loadItems = day => {
    const items = itemsCard || {};

    setTimeout(() => {
      for (let i = -5; i < 5; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
        }
      }

      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      console.log(newItems);

      setItemCard(newItems);
    }, 1000);
  };
  const renderEmptyDate = () => {
    return (
      <View style={Styles.weekScreenStyles.AgendarStylesProps.emptyDate}>
        <Divider />
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const timeToString = time => {
    const date = moment(time);
    return date.tz(RNLocalize.getTimeZone()).format().split('T')[0];
  };
  const eventsCallback = useCallback(() => {
    const tempObj = {};
    const timeZone = RNLocalize.getTimeZone();
    const localeTime = selectedDate;
    tempObj[localeTime] = [];
    for (const item of eventsState.events) {
      const day = moment(item.start).tz(timeZone).format().split('T')[0];
      const name = item.title;
      if (!tempObj.hasOwnProperty(day)) {
        tempObj[day] = [];
      }
      const tempdata = {
        name: name,
        description: item.description,
        start: moment(new Date(item.start)).tz(timeZone),
        end: moment(new Date(item.end)).tz(timeZone),
      };
      if (day == localeTime) {
        // tempObj[day] = [tempdata];
        tempObj[day].push(tempdata);
      }
    }
    Object.keys(tempObj).forEach(key => {
      tempObj[key] = tempObj[key].sort(
        (a, b) => a.start.valueOf() - b.start.valueOf(),
      );
      tempObj[key].forEach((item, i) => {
        item.index = i;
      });
    });
    setItemCard(tempObj);
    console.log(tempObj);
  }, [eventsState, selectedDate]);
  useEffect(() => {
    eventsCallback();
  }, [eventsCallback, selectedDate]);

  return (
    <View style={[Styles.globalStyles.viewStyle.bgColorWhite, {flex: 1}]}>
      <Agenda
        windowSize={12}
        initialNumToRender={12}
        removeClippedSubviews={true}
        pastScrollRange={12}
        futureScrollRange={12}
        items={itemsCard}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={false}
        hideKnob={false}
        onDayPress={day => {
          // console.log('day pressed', day);
          setSelectedDate(day['dateString']); // เเก้
        }}
        showOnlySelectedDayItems={true}
        theme={Styles.weekScreenStyles.theme}
        // key={'th'}
      />
    </View>
  );
};
const mapStateToProps = function (state) {
  return {
    eventsState: state.events,
    navigationState: state.StackNavigation,
  };
};
export default connect(mapStateToProps)(AgendaComponents);
