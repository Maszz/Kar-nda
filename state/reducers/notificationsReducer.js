import {createReducer} from '@reduxjs/toolkit';

const initialState = {notification: true};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setNotification', (state, action) => {
      state.notification = action.payload;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
