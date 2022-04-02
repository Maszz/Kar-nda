import {createReducer} from '@reduxjs/toolkit';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
const initialState = {dairy: {}, todo: []};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('onSubmitDairyForm', (state, action) => {
      const timeZone = RNLocalize.getTimeZone();
      const date = moment(new Date(action.payload.date).toISOString())
        .tz(timeZone)
        .format()
        .split('T')[0];
      state.dairy[date] = action.payload;
      console.log(state);
    })
    .addCase('onSubmitTodoForm', (state, action) => {
      state.todo.push(action.payload);
      console.log(state);
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
