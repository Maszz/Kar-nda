export const setStackNavigation = value => {
  return dispatch => {
    console.log('In dispatch', value);
    dispatch({
      type: 'setStackNavigation',
      payload: {navigation: value},
    });
  };
};
