import * as globalStyles from './globalStyles';
import {StyleSheet} from 'react-native';

export const AgendarStylesProps = StyleSheet.create({
  item: {
    backgroundColor: globalStyles.cardColor,
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 20,
    flex: 1,
    paddingTop: 30,
  },
});

export const theme = {
  backgroundColor: globalStyles.primaryColor,
  calendarBackground: globalStyles.primaryColor,
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: globalStyles.textPrimaryColor,
  todayTextColor: '#00adf5',
  dayTextColor: globalStyles.textPrimaryColor,
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: globalStyles.textPrimaryColor,
  disabledArrowColor: '#d9e1e8',
  monthTextColor: globalStyles.textPrimaryColor,
  indicatorColor: 'blue',
  // textDayFontFamily: 'monospace',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16,
};
