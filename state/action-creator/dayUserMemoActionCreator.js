export const addDairy = dto => {
  return dispatch => {
    dispatch({
      type: 'onSubmitDairyForm',
      payload: dto,
    });
  };
};

export const addTodo = dto => {
  return dispatch => {
    dispatch({
      type: 'onSubmitTodoForm',
      payload: dto,
    });
  };
};
