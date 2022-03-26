import {createReducer} from '@reduxjs/toolkit';

const initialState = {month: '', year: ''};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('onSwipeMonthChange', (state, action) => {
      state.month = action.payload.month;
      state.year = action.payload.year;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
