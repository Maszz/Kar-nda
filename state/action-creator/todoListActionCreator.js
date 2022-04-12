export const setStackNavigation = value => {
  return dispatch => {
    dispatch({
      type: 'setTodolist',
      payload: {date: value.date, todoItem: value.todoItem},
    });
  };
};
