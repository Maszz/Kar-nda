import React, {useEffect, useRef, useState} from 'react';
import {
  actions,
  getContentCSS,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import {
  Button,
  Box,
  FormControl,
  Stack,
  View,
  Text,
  Input,
  WarningOutlineIcon,
  TextArea,
  HStack,
  Container,
  VStack,
  Spacer,
  Divider,
  ZStack,
} from 'native-base';
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch, useSelector, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import * as RNLocalize from 'react-native-localize';
import {Styles} from '../styles';
const DissmissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {children}
    </TouchableWithoutFeedback>
  );
};

function DiaryModal({navigation, route, dayUserMemoState, navigationState}) {
  const [dairy, setDairy] = useState({
    title: '',
    dairyText: '',
    date: '',
    image: undefined,
  });

  // const dayUserMemoState = useSelector(state => state.dayUserMemo);
  const {date} = route.params;
  const [dateToDay, setDateToDay] = useState(new Date(date));

  const richText = useRef();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // const dairyDTO = {title:"",dairyText:""}
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    const currentDate = date;
    const dairyKeys = Object.keys(dayUserMemoState.dairy);
    for (const key of dairyKeys) {
      if (key == currentDate) {
        setDairy(dayUserMemoState.dairy[key]);
        break;
      }
    }
  }, [dayUserMemoState]);
  return (
    <DissmissKeyboard>
      <View
        style={{backgroundColor: '#1F2937', width: '100%', height: '100%'}}
        showsHorizontalScrollIndicator={false}>
        <VStack width="100%">
          <ZStack>
            <Box>
              <Image
                source={{uri: dairy.image}}
                defaultSource={require('../assets/IMG_0715.jpg')}
                style={{width: 428, height: 340}}
              />
              <Box width="100%" height={2.5} backgroundColor="#7198DC" />
            </Box>

            <Box
              style={{
                backgroundColor: 'rgba(0,0,0)',
                width: '100%',
                height: '50%',
              }}></Box>
          </ZStack>
          <Box
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '15%',
            }}></Box>
          <HStack justifyContent="space-between">
            <Box style={{alignSelf: 'flex-start', padding: 15}}>
              <Button
                variant="unstyled"
                color="white"
                style={{marginTop: 10}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require('../assets/backbutton2.png')}
                  style={{width: 32, height: 32}}
                />
              </Button>
            </Box>
            <Spacer />

            <Box style={{paddingTop: 15}}>
              <Button
                variant="unstyled"
                color="white"
                style={{marginTop: 10, marginRight: 10}}
                onPress={() => {
                  navigationState.navigation.goBack();
                  navigationState.navigation.navigate('DairyScreen', {
                    date: date,
                  });
                }}>
                <Image
                  source={require('../assets/editbotton.png')}
                  style={{width: 32, height: 32}}
                />
              </Button>
            </Box>
          </HStack>
          <Box
            style={{
              // flex: 1,
              alignItems: 'center',
              marginTop: '110%',
              position: 'absolute',
              alignSelf: 'center',
              width: '100%',
            }}>
            <Text color="white">{dairy.title}</Text>

            {/* <Divider width="60%" style={{marginTop: 10}} /> */}
            <Box style={{marginBottom: 10, marginTop: 10}}>
              <Text style={{color: 'white'}}>
                {`${days[dateToDay.getDay()]} ${dateToDay.getDate()} ${
                  months[dateToDay.getMonth()]
                } ${dateToDay.getFullYear()}`}
              </Text>
            </Box>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{width: '84%', height: '30%'}}>
              <Box>
                <RichEditor
                  editorStyle={{
                    backgroundColor: Styles.globalStyles.primaryColor,
                    color: 'white',
                  }}
                  ref={richText}
                  initialContentHTML={dairy.dairyText}
                  initialHeight={292}
                  disabled={true}
                />
              </Box>
            </KeyboardAvoidingView>
          </Box>
        </VStack>
      </View>
    </DissmissKeyboard>
  );
}
const mapStateToProps = function (state) {
  return {
    dayUserMemoState: state.dayUserMemo,
    navigationState: state.StackNavigation,
  };
};

export default connect(mapStateToProps)(DiaryModal);
