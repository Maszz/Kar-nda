export const onCalendarDayPress = value => {
  return dispatch => {
    dispatch({
      type: 'onCalendarDayPress',
      payload: value,
    });
  };
};
