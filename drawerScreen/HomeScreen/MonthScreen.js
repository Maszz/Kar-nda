import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {Calendar} from 'react-native-big-calendar';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Modal from '../../components/Modal';
import MonthNameComponent from '../../components/MonthName';
import {useDispatch, useSelector, connect} from 'react-redux';
import {actionCreators} from '../../state/index';

import {Center, View, Text, Box} from 'native-base';
import ActionButton from '../../components/ActionButton';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import {color} from 'native-base/lib/typescript/theme/styled-system';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Styles} from '../../styles';
import {useTranslation} from 'react-i18next';
import 'dayjs/locale/th';

const MonthScreen = ({onSwipeMonthChange, monthCalendarState, events}) => {
  const [currentDate, setCurrentDate] = useState(new Date(Date.now()));
  // const monthCalendarState = useSelector(state => state.monthCalendar);
  // const dispatch = useDispatch();
  // const {onSwipeMonthChange} = bindActionCreators(
  //   actionCreators.monthCalendarActionCreator,
  //   dispatch,
  // );
  // const {events} = useSelector(state => state.events);
  const [passingEvent, setPassingEvent] = useState([]);
  const {t, i18n} = useTranslation();
  const eventStateCallback = useCallback(() => {
    let tempList = [];
    const timeZone = RNLocalize.getTimeZone();
    console.log(events);

    for (const event of events) {
      let tempObj = {};
      tempObj['title'] = event.title;
      tempObj['start'] = new Date(event.start);
      tempObj['end'] = new Date(event.start);
      tempList.push(tempObj);
    }
    const sortedArr = tempList.sort(
      (a, b) => moment(a.start).unix() - moment(b.start).unix(),
    );
    console.log('final templist', sortedArr);
    setPassingEvent(sortedArr);
  }, [events, currentDate]);
  const monthNames = [
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

  const [touchY, setTouchY] = useState(0);
  const windowHeight = Dimensions.get('window').height;
  const [viewHeight, setViewHeight] = useState(0);
  useEffect(() => {
    eventStateCallback();
    onSwipeMonthChange(
      monthNames[currentDate.getMonth()],
      currentDate.getFullYear(),
    );
  }, [eventStateCallback, currentDate]);

  return (
    <View
      style={{flex: 1, backgroundColor: '#1F2937'}}
      onTouchStart={e => {
        if (windowHeight - viewHeight < e.nativeEvent.pageY) {
          setTouchY(e.nativeEvent.pageY);
          console.log(touchY);
        }
      }}
      onTouchEnd={e => {
        if (touchY - e.nativeEvent.pageY > 50 && touchY != 0) {
          setTouchY(0);
          console.log('Swiped up');
          const newDate = currentDate.setMonth(currentDate.getMonth() + 1);
          setCurrentDate(new Date(newDate));
        }
        if (e.nativeEvent.pageY - touchY > 50 && touchY != 0) {
          setTouchY(0);
          console.log('Swiped Down');
          const newDate = currentDate.setMonth(currentDate.getMonth() - 1);
          setCurrentDate(new Date(newDate));
        }
      }}
      onLayout={event => {
        var {height} = event.nativeEvent.layout;
        setViewHeight(height);
      }}>
      <Center style={{marginVertical: 10, backgroundColor: '#1F2937'}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>
          {monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear()}
        </Text>
      </Center>
      <Calendar
        locale={i18n.language == 'th' ? 'th' : undefined}
        events={passingEvent}
        height={Dimensions.get('window').height - 300}
        onPressEvent={e => {
          console.log('click event', e);
          // console.log(
          //   'IN Modal',
          //   selectedDateLocal.format().split('T')[0],
          // );
          // navigationState.navigation.navigate('EventModal', {
          //   date: selectedDateLocal.format().split('T')[0],
          //   index: i,
          // });
        }}
        // activeDate={new Date()}
        date={currentDate}
        mode="month"
        swipeEnabled={false}
        showTime={false}
        isRTL={false}
        showAllDayEventCell={true}
        // onChangeDate={a => {
        //   console.log(a);
        //   if (currentDate.getMonth() !== a[0].getMonth()) {
        //     setCurrentDate(a[0]);
        //   }

        //   console.log(currentDate);
        // }}
        onPressDateHeader={a => {
          console.log('press date header', a);
        }}
        headerContainerStyle={Styles.monthScreenStyles.headerContainerStyle}
        bodyContainerStyle={[
          Styles.monthScreenStyles.bodyContainerStyle,
          {color: 'white'},
        ]}
        // moreLabel={'{moreCount}asd'}
        calendarCellTextStyle={Styles.monthScreenStyles.calendarCellTextStyle}
        calendarCellStyle={Styles.monthScreenStyles.calendarCellStyle}
        calendarContainerStyle={{color: 'white'}}
        theme={{
          isRTL: false,
          palette: {
            primary: {
              main: 'rgb(66, 133, 244)',
              contrastText: '#fff',
            },
            nowIndicator: 'red',
            gray: {
              // 50: '#fafafa',
              100: '#f5f5f5',
              200: '#eeeeee',
              300: '#e0e0e0',
              // 400: '#bdbdbd',
              500: '#9e9e9e',
              // 600: '#757575',
              // 700: '#616161',
              800: '#424242',
              // 900: '#212121',
            },
            moreLabel: '#fff',
          },
          eventCellOverlappings: [
            {main: '#E26245', contrastText: '#fff'},
            {main: '#4AC001', contrastText: '#fff'},
            {main: '#5934C7', contrastText: '#fff'}, // purple
          ],
          typography: {
            xs: {
              fontSize: 10,
            },
            sm: {
              fontSize: 12,
            },
            xl: {
              fontSize: 22,
            },
            moreLabel: {
              fontSize: 11,
              fontWeight: 'bold',
            },
          },
        }}
        // dayHeaderHighlightColor="#ffff"
        // weekDayHeaderHighlightColor="#ffff"
      />
    </View>
  );
};

const mapStateToProps = function (state) {
  return {
    monthCalendarState: state.monthCalendar,
    events: state.events.events,
  };
};
const mapDispatchToProps = {
  onSwipeMonthChange:
    actionCreators.monthCalendarActionCreator.onSwipeMonthChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MonthScreen);
