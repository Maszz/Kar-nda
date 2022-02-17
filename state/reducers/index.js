import { combineReducers } from 'redux';

import userReducer from './userReducer';
import bankReducer from './bankReducer';
import calendarModalReducer from './calendarModalReducer';
import eventsReducer from './eventsReducer';
import monthCalendarReducer from './monthCalendarReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import onBoardReducer from './onBoardReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whilelist: ["events"]
}
const persistConfigOnboard = {
  key: 'onBoard',
  storage: AsyncStorage,
  whilelist: ["viewed"]
}

const reducers = combineReducers({
  user: userReducer,
  bank: bankReducer,
  calendarModal: calendarModalReducer,
  events: persistReducer(persistConfig, eventsReducer),
  onBoard: persistReducer(persistConfigOnboard, onBoardReducer),

  monthCalendar: monthCalendarReducer

});

export default reducers;
