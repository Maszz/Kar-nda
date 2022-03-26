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
} from 'native-base';
import {
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import * as RNLocalize from 'react-native-localize';

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

function DiaryModal({navigation}) {
  const [dateToDay, setDateToDay] = useState(new Date());
  const [dairy, setDairy] = useState({title: '', dairyText: '', date: ''});
  const dispatch = useDispatch();
  const {addDairy} = bindActionCreators(
    actionCreators.dayUserMemoActionCreator,
    dispatch,
  );
  const dayUserMemoState = useSelector(state => state.dayUserMemo);

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
    const timeZone = RNLocalize.getTimeZone();
    const currentDate = moment(new Date(Date.now()))
      .tz(timeZone)
      .format()
      .split('T')[0];
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
      <ScrollView
        style={{backgroundColor: '#1F2937'}}
        showsHorizontalScrollIndicator={false}>
        <VStack>
          <Box
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text color="white">{dairy.title}</Text>

            <Divider width="60%" style={{marginTop: 10}} />
            <Box style={{marginBottom: 10, marginTop: 10}}>
              <Text style={{color: 'white'}}>
                {`${days[dateToDay.getDay()]} ${dateToDay.getDate()} ${
                  months[dateToDay.getMonth()]
                } ${dateToDay.getFullYear()}`}
              </Text>
            </Box>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1, width: '90%'}}>
              <Box>
                <RichEditor
                  editorStyle={{backgroundColor: '#1F2937', color: 'white'}}
                  ref={richText}
                  initialContentHTML={dairy.dairyText}
                  initialHeight={500}
                  disabled={true}
                />
              </Box>
            </KeyboardAvoidingView>
          </Box>
        </VStack>
      </ScrollView>
    </DissmissKeyboard>
  );
}

export default DiaryModal;
