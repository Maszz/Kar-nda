export const setViewedOnboard = (value) => {
    return dispatch => {
        console.log("In dispatch", value);
        dispatch({
            type: 'setViewedOnboard',
            payload: { value: value },
        });
    };
};
