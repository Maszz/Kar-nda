import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/colors/colors';
import {Styles} from '../styles';

const data = [
  {
    title: 'Save time by tracking your day',
    text: 'Schedule your time, achivements and more.',
    image: require('../assets/images/Onboard1.png'),
  },
  {
    title: 'Stay on top of your day',
    text: 'Reduce your stress, increase your productivity',
    image: require('../assets/images/Onboard2.png'),
  },
  {
    title: 'Spend more time doing the things you love',
    text: 'Get started within less minute.',
    image: require('../assets/images/Onboard3.png'),
  },
];

const Onboarding = props => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = item => item.title;

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <LinearGradient
        colors={[Styles.globalStyles.cardColor, Styles.globalStyles.cardColor]}
        style={[styles.linearGradient, styles.doneButtonWrapper]}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        // style={styles.doneButtonWrapper}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </LinearGradient>
      // <View style={styles.doneButtonWrapper}>
      //   <Text style={styles.doneButtonText}>Done</Text>
      // </View>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Prev</Text>
      </View>
    );
  };
  const renderSkipButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Skip</Text>
      </View>
    );
  };

  const handleDone = () => {
    props.handleDone();
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent
        animated={true}
        barStyle={'light-content'}
        networkActivityIndicatorVisible={true}
        backgroundColor="transparent"
        showHideTransition="slide"
      />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        renderSkipButton={renderSkipButton}
        showPrevButton={true}
        showSkipButton={true}
        onDone={handleDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Styles.globalStyles.primaryColor,
  },
  image: {
    marginVertical: 60,
  },
  title: {
    fontSize: 24,
    color: Styles.globalStyles.cardColor,
    textAlign: 'center',
    fontFamily: 'OpenSans-Bold',
    marginHorizontal: 60,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'OpenSans-SemiBold',
    marginHorizontal: 60,
    marginTop: 20,
  },
  dotStyle: {
    backgroundColor: colors.blueFaded,
  },
  activeDotStyle: {
    backgroundColor: Styles.globalStyles.cardColor,
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightText: {
    color: '#fff',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leftText: {
    color: '#fff',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 35,
    paddingRight: 50,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: -40,
  },
  doneButtonText: {
    fontSize: 14,
    fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    color: colors.white,
  },
});

export default Onboarding;
