import { createReducer } from '@reduxjs/toolkit';
import { stringHasContent } from 'react-native-big-calendar';
const initialState = { events: [] };


const reducer = createReducer(initialState, builder => {
    builder
        .addCase('addEvent', (state, action) => {
            state.events.push(action.payload)
            // state.events = []            
            // console.log(state);
        })
        .addCase('removeEvent', (state, action) => {
            const found = state.events.find(event => event.start === action.payload.start)
            if (found) {
                const index = state.events.indexOf(found)
                state.events.splice(index, 1)
            }


        })
        .addCase('resetEventList', (state, action) => {
            state.events = []
        })

        .addDefaultCase((state, action) => {
            return state;
        });
});

export default reducer;