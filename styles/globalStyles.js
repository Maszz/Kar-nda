import {StyleSheet} from 'react-native';

export const primaryColor = '#1F2937';

export const textPrimaryColor = '#ffff';

export const cardColor = '#7CC2FF';

export const viewAreaBackgroundColor = {
  backgroundColor: primaryColor,
};
export const viewStyle = StyleSheet.create({
  viewArea: {
    ...viewAreaBackgroundColor,
  },
  displayNone: {
    display: 'none',
  },
  bgColorWhite: {
    backgroundColor: textPrimaryColor,
  },
});

export const cardContainer = StyleSheet.create({
  cardBgcolor: {
    backgroundColor: cardColor,
  },
});

export const textStyles = StyleSheet.create({
  textPrimaryStyle: {
    color: textPrimaryColor,
  },
});
