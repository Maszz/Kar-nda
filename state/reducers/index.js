import { combineReducers } from 'redux';

import userReducer from './userReducer';
import bankReducer from './bankReducer';
import calendarModalReducer from './calendarModalReducer';
import eventsReducer from './eventsReducer';
import monthCalendarReducer from './monthCalendarReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whilelist: "events"
}

const reducers = combineReducers({
  user: userReducer,
  bank: bankReducer,
  calendarModal: calendarModalReducer,
  events: persistReducer(persistConfig, eventsReducer),

  monthCalendar: monthCalendarReducer

});

export default reducers;
