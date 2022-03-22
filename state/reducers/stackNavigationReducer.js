import {createReducer} from '@reduxjs/toolkit';

const initialState = {navigation: undefined};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setStackNavigation', (state, action) => {
      console.log(action.payload.navigation);
      state.navigation = action.payload.navigation;
      console.log('inredux', state.navigation);
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
