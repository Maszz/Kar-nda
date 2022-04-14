import {combineReducers} from 'redux';

import calendarModalReducer from './calendarModalReducer';
import eventsReducer from './eventsReducer';
import monthCalendarReducer from './monthCalendarReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import onBoardReducer from './onBoardReducer';
import StackNavigationReducer from './stackNavigationReducer';
import dayUserMemoReducer from './dayUserMemoReducer';
import selectedDateReducer from './selectedDateReducer';
import todoListReducer from './todoListReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whilelist: ['events'],
};
const persistConfigOnboard = {
  key: 'onBoard',
  storage: AsyncStorage,
  whilelist: ['viewed'],
};
const persistConfigDayUserConfig = {
  key: 'dayUserMemo',
  storage: AsyncStorage,
  whilelist: ['dairy', 'todo'],
};
const persistConfigTodoList = {
  key: 'todoList',
  storage: AsyncStorage,
  whilelist: ['todoItem'],
};

/**
 * Combine Reducers to one instance.
 * @reducer `calendarModalReducer`
 * @persistReducer `eventsReducer`
 * @persistReducer `onBoardReducer`
 */
const reducers = combineReducers({
  calendarModal: calendarModalReducer,
  events: persistReducer(persistConfig, eventsReducer),
  onBoard: persistReducer(persistConfigOnboard, onBoardReducer),
  StackNavigation: StackNavigationReducer,
  dayUserMemo: persistReducer(persistConfigDayUserConfig, dayUserMemoReducer),
  monthCalendar: monthCalendarReducer,
  selectedDate: selectedDateReducer,
  todoList: persistReducer(persistConfigTodoList, todoListReducer),
});

export default reducers;
