export const onSwipeMonthChange = (month, year) => {
    return dispatch => {
        dispatch({
            type: 'onSwipeMonthChange',
            payload: { month: month, year: year },
        });
    };
};
