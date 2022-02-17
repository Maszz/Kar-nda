import {createReducer} from '@reduxjs/toolkit';
const initialState = {name: '', email: ''};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'onChangeTextField':
      const stateChanged = {};
      Object.assign(stateChanged, state);
      stateChanged[action.payload.prop] = action.payload.value;
      console.log(stateChanged);
      return stateChanged;
    case 'resetTextFieldState':
      return action.payload;
    default:
      console.log('default2');

      return state;
  }
};
const reducerwithStateMutator = createReducer(initialState, builder => {
  builder
    .addCase('onChangeTextField', (state, action) => {
      state[action.payload.prop] = action.payload.value;
      // console.log(state);
    })
    .addCase('resetTextFieldState', (state, action) => {
      return action.payload;
    })
    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducerwithStateMutator;
