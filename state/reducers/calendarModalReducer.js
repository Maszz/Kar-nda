import {createReducer} from '@reduxjs/toolkit';

const initialState = {isVisible: false};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('onCalendarDayPress', (state, action) => {
      state.isVisible = action.payload;
      console.log(state);
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
