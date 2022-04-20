export const setNotification = value => {
  return dispatch => {
    dispatch({
      type: 'setNotification',
      payload: value,
    });
  };
};
