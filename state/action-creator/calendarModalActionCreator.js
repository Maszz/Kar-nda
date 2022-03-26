export const addEvent = event => {
  return dispatch => {
    dispatch({
      type: 'addEvent',
      payload: event,
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
