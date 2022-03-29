export const setSelectedDate = value => {
  return dispatch => {
    dispatch({
      type: 'onChangeSelectedDate',
      payload: value,
    });
  };
};
