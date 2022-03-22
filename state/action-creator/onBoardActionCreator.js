export const setViewedOnboard = value => {
  return dispatch => {
    dispatch({
      type: 'setViewedOnboard',
      payload: {value: value},
    });
  };
};
