import {createReducer} from '@reduxjs/toolkit';

const initialState = 0;

const reducer = createReducer(initialState, builder => {
  builder
    .addCase('deposit', (state, action) => {
      return state + action.payload;
    })
    .addCase('withdraw', (state, action) => {
      return state - action.payload;
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
