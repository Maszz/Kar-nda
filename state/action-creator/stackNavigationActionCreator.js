export const setStackNavigation = value => {
  return dispatch => {
    dispatch({
      type: 'setStackNavigation',
      payload: {navigation: value},
    });
  };
};
