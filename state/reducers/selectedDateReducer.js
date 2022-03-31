import {createReducer} from '@reduxjs/toolkit';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';

const timeZone = RNLocalize.getTimeZone();

const initialState = {
  selectedDateState: moment(new Date(Date.now())).tz(timeZone),
};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('onChangeSelectedDate', (state, action) => {
      state.selectedDateState = action.payload;
      console.log('State :', action.payload);
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
