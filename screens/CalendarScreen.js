import React, {useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeProvider} from 'react-native-elements';

import CalendarComponent from '../components/Carendar';

const CalendarScreen = props => {
  const [markedDates, setMarkedDates] = useState({
    '2022-01-16': {selected: true, marked: true, selectedColor: 'blue'},
  });
  return (
    <ThemeProvider theme={theme}>
      <CalendarComponent markedDates={markedDates} />
    </ThemeProvider>
  );
};

const theme = {
  Button: {
    raised: true,
  },
};

export default CalendarScreen;
