import { createReducer } from '@reduxjs/toolkit';

const initialState = { viewed: "false" };
const reducer = createReducer(initialState, builder => {
    builder
        .addCase('setViewedOnboard', (state, action) => {
            console.log(action.payload.value)
            state.viewed = action.payload.value
            console.log("inredux", state.viewed)
        })

        .addDefaultCase((state, action) => {
            return state;
        });
});

export default reducer;
