import * as globalStyles from './globalStyles';
import {StyleSheet} from 'react-native';

export const headerContainerStyle = {
  backgroundColor: '#1F2937',
  paddingLeft: 0,
  borderColor: 'gray',
};
export const bodyContainerStyle = {
  backgroundColor: '#1F2937',
  borderColor: 'rgba(255,255,255,0)',
};

export const calendarCellTextStyle = {
  ...globalStyles.textStyles.textPrimaryStyle,
};

export const calendarCellStyle = {borderColor: 'gray'};
