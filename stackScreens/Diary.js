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

function Diary({navigation}) {
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
          <Box style={{alignSelf: 'flex-end', padding: 15}}>
            {/* <Button
              variant="unstyled"
              onPress={() => {
                console.log(dayUserMemoState);
              }}>
              <Text style={{color: 'white'}}>logs</Text>
            </Button> */}
            <Button
              variant="unstyled"
              onPress={() => {
                const dairyDTO = {
                  title: dairy.title,
                  dairyText: dairy.dairyText,
                };
                console.log(dairyDTO);
                addDairy(dairyDTO);
                navigation.goBack();
              }}>
              <Text style={{color: 'white'}}>Save</Text>
            </Button>
          </Box>
          <Box
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Input
              caretHidden={false}
              selectionColor="white"
              color="white"
              variant="unstyled"
              placeholder="Title The days"
              value={dairy.title}
              onChangeText={text => {
                setDairy({
                  title: text,
                  dairyText: dairy.dairyText,
                });
                // setTitle(text);
                console.log(dairy);
              }}
              size="2xl"
            />

            <Divider width="60%" />
            <Box style={{marginBottom: 10, marginTop: 10}}>
              <Text style={{color: 'white'}}>
                {`${days[dateToDay.getDay()]} ${dateToDay.getDate()} ${
                  months[dateToDay.getMonth()]
                } ${dateToDay.getFullYear()}`}
              </Text>
            </Box>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <RichToolbar
                editor={richText}
                actions={[
                  actions.keyboard,
                  actions.setBold,
                  actions.setItalic,
                  actions.setUnderline,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  actions.setStrikethrough,
                  actions.checkboxList,
                  actions.blockquote,
                ]}
              />
              <RichToolbar
                editor={richText}
                actions={[
                  actions.alignLeft,
                  actions.alignCenter,
                  actions.alignRight,
                  actions.alignFull,
                ]}
              />
              <Box borderWidth={2} borderColor="white">
                <RichEditor
                  editorStyle={{backgroundColor: '#1F2937', color: 'white'}}
                  ref={richText}
                  onChange={descriptionText => {
                    // console.log('descriptionText:', descriptionText);
                    setDairy({
                      title: dairy.title,
                      dairyText: descriptionText,
                    });
                    // setDairyText(descriptionText);
                    // console.log(dairyText);
                    console.log(dairy);
                  }}
                  initialContentHTML={dairy.dairyText}
                  initialHeight={500}
                />
              </Box>
            </KeyboardAvoidingView>

            {/* <TextArea
            h={20}
            placeholder="Desicribe your title."
            w="100%"
            maxW="300"
            onChangeText={text => {
              setFormData({
                start: formData.start,
                end: formData.end,
                date: formData.date,
                title: formData.title,
                description: text,
              });
            }}
          /> */}
          </Box>
        </VStack>
      </ScrollView>
    </DissmissKeyboard>
  );
}

export default Diary;
