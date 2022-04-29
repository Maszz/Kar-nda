export const addEvent = (event, isNotifiaction) => {
  return dispatch => {
    dispatch({
      type: 'addEvent',
      payload: {event: event, isNotification: isNotifiaction},
    });
  };
};

export const removeEvent = event => {
  return dispatch => {
    dispatch({
      type: 'removeEvent',
      payload: event,
    });
  };
};

export const resetEventList = () => {
  return dispatch => {
    dispatch({
      type: 'resetEventList',
      paylozad: [],
    });
  };
};
