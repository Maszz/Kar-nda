export const setTodoList = value => {
  return dispatch => {
    dispatch({
      type: 'setTodoItem',
      payload: {date: value.date, todoList: value.todoItem},
    });
  };
};

export const setTodoLength = value => {
  return dispatch => {
    dispatch({
      type: 'setTodoLength',
      payload: value,
    });
  };
};
