import * as globalStyles from './globalStyles';
import {StyleSheet} from 'react-native';

export const ViewStyles = StyleSheet.create({
  viewContainer: {
    ...globalStyles.viewAreaBackgroundColor,
    flex: 1,
  },
  dayContainerStyle: {
    ...globalStyles.viewAreaBackgroundColor,
    width: 34,
    height: 50,
    borderRadius: 10,
  },
});

export const calendarStripStylesProps = {
  daySelectionAnimation: {
    type: 'border',
    duration: 200,
    borderWidth: 1,
    borderHighlightColor: 'white',
  },
  calendarAnimation: {type: 'sequence', duration: 30},
};
