import {createReducer} from '@reduxjs/toolkit';
import {stringHasContent} from 'react-native-big-calendar';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
import PushNotification from 'react-native-push-notification';

const initialState = {events: []};

const reducer = createReducer(initialState, builder => {
  builder
    .addCase('addEvent', (state, action) => {
      const event = action.payload.event;
      state.events.push(event);
    })
    .addCase('removeEvent', (state, action) => {
      const filtered = state.events.filter(
        item =>
          moment(new Date(item.start))
            .tz(RNLocalize.getTimeZone())
            .format()
            .split('T')[0] ==
          action.payload.start
            .tz(RNLocalize.getTimeZone())
            .format()
            .split('T')[0],
      );
      console.log(filtered);
      const found = filtered.find(
        event => event.title === action.payload.title,
      );
      console.log(found);

      if (found) {
        const index = state.events.indexOf(found);
        console.log(index);
        const temp = state.events[index];
        PushNotification.cancelLocalNotification(temp.title + '-' + temp.start);

        state.events.splice(index, 1);
      }
      console.log('Original:', state.events);
    })
    .addCase('resetEventList', (state, action) => {
      state.events = [];
    })

    .addDefaultCase((state, action) => {
      return state;
    });
});

export default reducer;
