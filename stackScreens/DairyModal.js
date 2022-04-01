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
import {useDispatch, useSelector, connect} from 'react-redux';
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

function DiaryModal({navigation, route, dayUserMemoState}) {
  const [dairy, setDairy] = useState({title: '', dairyText: '', date: ''});

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
      <ScrollView
        style={{backgroundColor: '#1F2937'}}
        showsHorizontalScrollIndicator={false}>
        <VStack width="100%">
          <Box style={{alignSelf: 'flex-start', padding: 15}}>
            <Button
              variant="unstyled"
              color="white"
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={{color: 'white'}}>Back</Text>
            </Button>
          </Box>
          <Box
            style={{
              flex: 1,
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
const mapStateToProps = function (state) {
  return {
    dayUserMemoState: state.dayUserMemo,
  };
};

export default connect(mapStateToProps)(DiaryModal);
