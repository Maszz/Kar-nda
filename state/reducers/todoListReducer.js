import {createReducer} from '@reduxjs/toolkit';

const initialState = {todoItem: {}, todoLength: 0};
const reducer = createReducer(initialState, builder => {
  builder
    .addCase('setTodoItem', (state, action) => {
      console.log('In reducer', action.payload);
      const temp = action.payload;
      state.todoItem[temp.date] = temp.todoList;
    })
    .addCase('setTodoLength', (state, action) => {
      state.todoLength = action.payload;
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
