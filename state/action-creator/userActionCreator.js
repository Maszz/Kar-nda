export const onChangeTextField = (value, prop) => {
  return dispatch => {
    dispatch({
      type: 'onChangeTextField',
      payload: { value: value, prop: prop },
    });
  };
};
export const resetTextFieldState = () => {
  return dispatch => {
    dispatch({
      type: 'resetTextFieldState',
      payload: { name: '', email: '' },
    });
  };
};
