import {createReducer} from '@reduxjs/toolkit';

const initialState = {navigation: undefined};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setStackNavigation', (state, action) => {
      state.navigation = action.payload.navigation;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
