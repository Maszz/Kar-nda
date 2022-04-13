import React, {useState, useEffect, useCallback} from 'react';
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
import {
  ZStack,
  Box,
  VStack,
  Divider,
  Text,
  Container,
  Checkbox,
} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector, connect} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state/index';
import * as RNLocalize from 'react-native-localize';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {Styles} from '../../styles';
import {useTranslation} from 'react-i18next';
import {calendarStripLocaleTh} from '../../translations/calendarStrip';
import TodoList from '../../components/todolist';
const DayScreen = ({
  navigation,
  route,
  selectedDateState,
  setSelectedDate,
  navigationState,
  eventsState,
  dayUserMemoState,
  todoListItems,
  setTodoListState,
}) => {
  // const navigationState = useSelector(state => state.StackNavigation);
  const [eventCard, setEventCard] = useState([]);
  const timeZone = RNLocalize.getTimeZone();
  // const {selectedDateState} = useSelector(state => state.selectedDate);
  // const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [todoList, setTodoList] = useState([
    {todoTitle: 'fsd', ischecked: true},
    {todoTitle: 'sd', ischecked: false},
  ]);
  const todolistDto = {
    '12-34-56': [
      {todoTitle: 'fsd', ischecked: false},
      {todoTitle: 'sd', ischecked: false},
    ],
  };

  const [selectedDateLocal, setSelectedDateLocal] = useState(selectedDateState);
  // const eventsState = useSelector(state => state.events);
  // const dayUserMemoState = useSelector(state => state.dayUserMemo);
  // const {setSelectedDate} = bindActionCreators(
  //   actionCreators.selectedDateActionCreator,
  //   dispatch,
  // );
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

  const isFocused = useIsFocused();
  if (!isFocused) {
    console.log('Defocus Effect');
    setSelectedDate(selectedDateLocal);
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedDateLocal(selectedDateState);
      console.log('Focus Effect');
      const dairyKeys = Object.keys(dayUserMemoState.dairy);
      for (const key of dairyKeys) {
        if (key == selectedDateState.toISOString().split('T')[0]) {
          setSelectedDairy(dayUserMemoState.dairy[key]);
          break;
        }
        setSelectedDairy({title: '', dairyText: '', date: ''});
      }

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [selectedDateState, dayUserMemoState]),
  );
  const eventStateCallback = useCallback(() => {
    const currentDate = selectedDateState.format().split('T')[0];
    const tempArr = [];

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
    console.log(sortedArr);
    setEventCard(sortedArr);
  }, [eventsState.events, selectedDateState]);
  const dayUserMemoStateCallback = useCallback(() => {
    const dairyKeys = Object.keys(dayUserMemoState.dairy);
    for (const key of dairyKeys) {
      if (key == selectedDateState.toISOString().split('T')[0]) {
        setSelectedDairy(dayUserMemoState.dairy[key]);
        break;
      }
      setSelectedDairy({title: '', dairyText: '', date: ''});
    }
  }, [dayUserMemoState, selectedDateState]);

  const todoListStateCallback = useCallback(() => {
    const currentDate = selectedDateLocal.format().split('T')[0];

    const todolistDays = Object.keys(todoListItems.todoItem);
    console.log(todolistDays);
    setTodoList([]);

    for (const key of todolistDays) {
      if (key == currentDate) {
        setTodoList(todoListItems.todoItem[key]);
        console.log('incase');
        break;
      }
    }
  }, [todoListItems, selectedDateState]);

  useEffect(() => {
    const currentDate = selectedDateState.format().split('T')[0];
    const tempArr = [];

    // for (const event of eventsState.events) {
    //   if (
    //     currentDate ==
    //     moment(new Date(event.start)).tz(timeZone).format().split('T')[0]
    //   ) {
    //     tempArr.push(event);
    //   }
    // }
    // console.log('THis is temp arr ', tempArr);
    // const sortedArr = tempArr.sort(
    //   (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    // );
    // console.log(sortedArr);
    // setEventCard(sortedArr);
    eventStateCallback();

    // const dairyKeys = Object.keys(dayUserMemoState.dairy);
    // for (const key of dairyKeys) {
    //   if (key == selectedDateState.toISOString().split('T')[0]) {
    //     setSelectedDairy(dayUserMemoState.dairy[key]);
    //     break;
    //   }
    //   setSelectedDairy({title: '', dairyText: '', date: ''});
    // }
    dayUserMemoStateCallback();

    // const todolistDays = Object.keys(todoListItems.todoItem);
    // console.log(todolistDays);
    // setTodoList([]);

    // for (const key of todolistDays) {
    //   if (key == currentDate) {
    //     setTodoList(todoListItems.todoItem[key]);
    //     console.log('incase');
    //   }
    // }
    todoListStateCallback();
  }, [
    eventStateCallback,
    dayUserMemoStateCallback,
    selectedDateState,
    todoListStateCallback,
  ]);

  return (
    <View style={Styles.dayScreenStyles.ViewStyles.viewContainer}>
      <CalendarStrip
        scrollable
        locale={i18n.language == 'th' ? calendarStripLocaleTh : undefined}
        selectedDate={selectedDateLocal}
        calendarAnimation={
          Styles.dayScreenStyles.calendarStripStylesProps.calendarAnimation
        }
        style={{height: 50, paddingHorizontal: 5, marginTop: 25}}
        daySelectionAnimation={
          Styles.dayScreenStyles.calendarStripStylesProps.daySelectionAnimation
        }
        calendarColor={Styles.globalStyles.primaryColor}
        dayContainerStyle={Styles.dayScreenStyles.ViewStyles.dayContainerStyle}
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
          setSelectedDateLocal(date);

          // set dairy.
          const dairyKeys = Object.keys(dayUserMemoState.dairy);
          for (const key of dairyKeys) {
            if (key == date.toISOString().split('T')[0]) {
              setSelectedDairy(dayUserMemoState.dairy[key]);
              break;
            }
            setSelectedDairy({title: '', dairyText: '', date: ''});
          }

          //set list todo

          const currentDate = date.format().split('T')[0];

          const todolistDays = Object.keys(todoListItems.todoItem);
          console.log(todolistDays);
          setTodoList([]);

          for (const key of todolistDays) {
            if (key == currentDate) {
              setTodoList(todoListItems.todoItem[key]);
              console.log('incase');
              break;
            }
          }
        }}
        highlightDateNameStyle={Styles.globalStyles.textStyles.textPrimaryStyle}
        highlightDateNumberStyle={
          Styles.globalStyles.textStyles.textPrimaryStyle
        }
        highlightDateContainerStyle={
          Styles.globalStyles.cardContainer.cardBgcolor
        }
        dateNumberStyle={Styles.globalStyles.textStyles.textPrimaryStyle}
        dateNameStyle={Styles.globalStyles.textStyles.textPrimaryStyle}
        calendarHeaderStyle={Styles.globalStyles.viewStyle.displayNone}
        iconContainer={Styles.globalStyles.viewStyle.displayNone}
      />

      <VStack style={{padding: 25}}>
        <Text
          style={[
            Styles.globalStyles.textStyles.textPrimaryStyle,
            {marginBottom: 5},
          ]}>
          {t('common:events')}
        </Text>
        <Box
          style={Styles.globalStyles.viewStyle.bgColorWhite}
          width={Dimensions.get('window').width - 50}
          height={0.5}
        />
        <ScrollView
          // height={166}
          style={{marginTop: 20, minHeight: 90, maxHeight: 166}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {eventCard.length === 0 && (
            <TouchableOpacity>
              <Box
                width={Dimensions.get('window').width - 50}
                height={75}
                border="1"
                borderRadius={5}
                style={[
                  Styles.globalStyles.cardContainer.cardBgcolor,
                  {marginBottom: 15},
                ]}>
                <VStack style={{padding: 10}}>
                  <Text
                    style={[
                      Styles.globalStyles.textStyles.textPrimaryStyle,
                      {fontWeight: 'bold', fontSize: 18},
                    ]}>
                    To day no Event for You
                  </Text>
                  <Text
                    style={[
                      Styles.globalStyles.textStyles.textPrimaryStyle,
                      {fontSize: 13},
                    ]}>
                    use This for relex your self
                  </Text>
                </VStack>
              </Box>
            </TouchableOpacity>
          )}

          {eventCard.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                keyExtractor={(item, i) => `${i}`}
                onPress={() => {
                  console.log(
                    'IN Modal',
                    selectedDateLocal.format().split('T')[0],
                  );
                  navigationState.navigation.navigate('EventModal', {
                    date: selectedDateLocal.format().split('T')[0],
                    index: i,
                  });
                }}>
                <Box
                  width={Dimensions.get('window').width - 50}
                  height={75}
                  border="1"
                  borderRadius={5}
                  style={[
                    Styles.globalStyles.cardContainer.cardBgcolor,
                    {marginBottom: 15},
                  ]}>
                  <VStack style={{padding: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        Styles.globalStyles.textStyles.textPrimaryStyle,
                        {fontSize: 13},
                      ]}>
                      {item.description}
                    </Text>
                  </VStack>
                </Box>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text
          style={[
            Styles.globalStyles.textStyles.textPrimaryStyle,
            {marginTop: 10, marginBottom: 5},
          ]}>
          List To do
        </Text>
        <Box
          style={[
            Styles.globalStyles.viewStyle.bgColorWhite,
            {marginBottom: 20},
          ]}
          width={Dimensions.get('window').width - 50}
          height={0.5}
        />
        <TouchableOpacity>
          <Box style={{minHeight: 50}}>
            {/* {todoList.map((todo, i) => {
              return (
                <Checkbox
                  onChange={isSeletced => {
                    console.log('Before: ', todoList);
                    todoList[i].ischecked = isSeletced;
                    todoList[i].todoTitle = 'test';
                    setTodoList([]);

                    console.log('After: ', todoList);
                    setTodoList(todoList);
                    // todoObj[i].ischecked = isSeletced;
                    // console.log(todoObj);
                    // setTodoList(todoObj);
                  }}
                  colorScheme="info"
                  value="2"
                  defaultIsChecked={todo.ischecked}>
                  <Text
                    style={{
                      color: 'white',
                      textDecorationLine: todo.ischecked
                        ? 'line-through'
                        : 'none',
                    }}>
                    {todo.todoTitle}
                  </Text>
                </Checkbox>
              );
            })} */}
            <TodoList
              list={todoList}
              setList={setTodoList}
              setTodoListState={setTodoListState}
              selectedDate={selectedDateLocal}
            />
            {/* <Checkbox
              colorScheme="info"
              value="2"
              my={0.5}
              defaultIsChecked={true}>
              <Text
                style={{
                  color: 'white',
                  textDecorationLine: true ? 'line-through' : 'none',
                }}>
                UX Research
              </Text>
            </Checkbox>
            <Checkbox
              onChange={() => {}}
              colorScheme="info"
              value="3"
              my={0.5}
              defaultIsChecked={false}>
              <Text style={{color: 'white'}}>Software Development</Text>
            </Checkbox> */}
          </Box>
        </TouchableOpacity>
        <VStack>
          <Text
            style={[
              Styles.globalStyles.textStyles.textPrimaryStyle,
              {marginBottom: 5},
            ]}>
            {t('common:diary')}
          </Text>
          <Box
            style={[
              Styles.globalStyles.viewStyle.bgColorWhite,
              {marginBottom: 20},
            ]}
            width={Dimensions.get('window').width - 50}
            height={0.5}
          />
          <TouchableOpacity
            onPress={() => {
              console.log(selectedDateLocal.toISOString().split('T')[0]);
              navigationState.navigation.navigate('DairyModal', {
                date: selectedDateLocal.toISOString().split('T')[0],
              });
            }}>
            <Box
              width={Dimensions.get('window').width - 50}
              height={75}
              border="1"
              borderRadius={5}
              style={[
                Styles.globalStyles.cardContainer.cardBgcolor,
                {
                  marginBottom: 20,
                  padding: 10,
                },
              ]}>
              <VStack>
                <Text style={Styles.globalStyles.textStyles.textPrimaryStyle}>
                  {selectedDairy.title == ''
                    ? `To day you don't wrote dairy yet.`
                    : `${selectedDairy.title}`}
                </Text>
                <Text style={Styles.globalStyles.textStyles.textPrimaryStyle}>
                  {`${
                    days[selectedDateLocal.day()]
                  } ${selectedDateLocal.date()} ${
                    months[selectedDateLocal.month()]
                  } ${selectedDateLocal.year()}`}
                </Text>
              </VStack>
            </Box>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </View>
  );
};

// const styles = StyleSheet.create({
//   bgcolor: {
//     backgroundColor: '#1F2937',
//   },
// });
const mapStateToProps = function (state) {
  return {
    selectedDateState: state.selectedDate.selectedDateState,
    navigationState: state.StackNavigation,
    eventsState: state.events,
    dayUserMemoState: state.dayUserMemo,
    todoListItems: state.todoList,
  };
};
const mapDispatchToProps = {
  setSelectedDate: actionCreators.selectedDateActionCreator.setSelectedDate,
  setTodoListState: actionCreators.todoListActionCreator.setTodoList,
};
export default connect(mapStateToProps, mapDispatchToProps)(DayScreen);
