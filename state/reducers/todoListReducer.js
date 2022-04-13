import {createReducer} from '@reduxjs/toolkit';

const initialState = {todoItem: {}};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setTodoItem', (state, action) => {
      console.log('In reducer', action.payload);
      const temp = action.payload;
      state.todoItem[temp.date] = temp.todoList;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
