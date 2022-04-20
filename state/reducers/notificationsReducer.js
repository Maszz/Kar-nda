import {createReducer} from '@reduxjs/toolkit';

const initialState = {notification: True};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setNotification', (state, action) => {
      state = action.payload;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
