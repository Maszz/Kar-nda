import {createReducer} from '@reduxjs/toolkit';

const initialState = {todoItem: {}};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setTodoItem', (state, action) => {
      state.action.payload.date = action.paylaod.todo;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
