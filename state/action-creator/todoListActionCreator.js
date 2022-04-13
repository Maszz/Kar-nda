export const setTodoList = value => {
  return dispatch => {
    dispatch({
      type: 'setTodoItem',
      payload: {date: value.date, todoList: value.todoItem},
    });
  };
};
