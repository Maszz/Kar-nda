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
  ScrollView,
  InputAccessoryView,
} from 'react-native';
// import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {useDispatch, useSelector, connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import * as RNLocalize from 'react-native-localize';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';

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

function Diary({
  navigation,
  addDairy,
  route,
  dayUserMemoState,
  navigationState,
}) {
  const {t} = useTranslation();

  const [dateToDay, setDateToDay] = useState(new Date());
  const [dairy, setDairy] = useState({
    title: '',
    dairyText: '',
    date: '',
    image: undefined,
  });
  const {date} = route.params;
  const [viewHeight, setHeight] = useState(0);
  const [uri, setUri] = useState(undefined);
  // const dispatch = useDispatch();
  // const {addDairy} = bindActionCreators(
  //   actionCreators.dayUserMemoActionCreator,
  //   dispatch,
  // );
  // const dayUserMemoState = useSelector(state => state.dayUserMemo);

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
    const currentDate = route.params.date;
    console.log('This is curren date', currentDate);
    const dairyKeys = Object.keys(dayUserMemoState.dairy);
    setDairy({
      title: '',
      dairyText: '',
      date: currentDate,
      image: undefined,
    });
    for (const key of dairyKeys) {
      if (key == currentDate) {
        setDairy(dayUserMemoState.dairy[key]);
        console.log(dayUserMemoState.dairy[key]);
        console.log('Incase');
        break;
      }
    }
    const keyboardListener1 = Keyboard.addListener('keyboardDidShow', () => {
      setHeight(300);
    });
    const keyboardListener2 = Keyboard.addListener('keyboardDidHide', () => {
      console.log('keyboard unshow');
      setHeight(0);
    });
    setDateToDay(new Date(currentDate));

    return () => {
      keyboardListener1.remove();
      keyboardListener2.remove();
    };
  }, [dayUserMemoState]);
  return (
    <DissmissKeyboard>
      <ScrollView
        style={{backgroundColor: '#1F2937', width: '100%'}}
        showsVerticalScrollIndicator={true}>
        <KeyboardAvoidingView
          behavior={
            Platform.OS === 'ios' ? 'padding' : 'height'
          }></KeyboardAvoidingView>
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
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '15%',
            }}></Box>
          <Box style={{alignSelf: 'center', marginTop: '60%'}}>
            <Button
              style={{backgroundColor: 'rgba(255,255,255,0)'}}
              onPress={async () => {
                try {
                  const result = await launchImageLibrary({uri: true});
                  console.log(result);
                  setDairy({
                    title: dairy.title,
                    dairyText: dairy.dairyText,
                    image: result.assets[0].uri,
                    date: dairy.date,
                  });
                  setUri(result.assets[0].uri);
                } catch (e) {
                  console.log(e);
                }
              }}>
              <Image
                source={require('../assets/Vector.png')}
                width={54}
                height={54}
              />
            </Button>
          </Box>
        </ZStack>
        <HStack style={{justifyContent: 'space-between'}}>
          <Box style={{marginTop: 15}}>
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
          <Box style={{marginTop: 15}}>
            <Button
              variant="unstyled"
              color="white"
              style={{marginTop: 10}}
              onPress={() => {
                const dairyDTO = {
                  title: dairy.title,
                  dairyText: dairy.dairyText,
                  image: dairy.image,
                  date: dairy.date,
                };

                console.log(dairyDTO);
                addDairy(dairyDTO);
                navigation.goBack();
              }}>
              <Image
                source={require('../assets/saved.png')}
                style={{width: 32, height: 32}}
              />
            </Button>
          </Box>
          <Box style={{marginTop: 15}}>
            <Button
              variant="unstyled"
              color="white"
              style={{marginTop: 10}}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={require('../assets/gobackHome.png')}
                style={{width: 32, height: 32}}
              />
            </Button>
          </Box>
        </HStack>

        <Box
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
            // height: '100%',
            justifyContent: 'center',
            // position: 'absolute',
            width: '100%',
            marginTop: '70%',
          }}>
          <Box style={{alignItems: 'center'}}>
            <Input
              caretHidden={false}
              selectionColor="white"
              textAlign={'center'}
              width="70%"
              color="white"
              variant="unstyled"
              placeholder={t('common:dailyTitle')}
              value={dairy.title}
              onChangeText={text => {
                setDairy({
                  title: text,
                  dairyText: dairy.dairyText,
                  image: dairy.image,
                  date: dairy.date,
                });
                // setTitle(text);
                console.log(dairy);
              }}
              size="2xl"
            />
          </Box>

          <Divider width="60%" />
          <Box style={{marginBottom: 10, marginTop: 10}}>
            <Text style={{color: 'white'}}>
              {`${days[dateToDay.getDay()]} ${dateToDay.getDate()} ${
                months[dateToDay.getMonth()]
              } ${dateToDay.getFullYear()}`}
            </Text>
          </Box>

          <View>
            <View>
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
                      image: dairy.image,
                      date: dairy.date,
                    });
                    // setDairyText(descriptionText);
                    // console.log(dairyText);
                    console.log(dairy);
                  }}
                  initialContentHTML={dairy.dairyText}
                  initialHeight={292}
                />
              </Box>

              <Box width="100%" height={viewHeight} />
            </View>
          </View>
        </Box>
        <KeyboardAvoidingView />
      </ScrollView>
    </DissmissKeyboard>
  );
}
const mapStateToProps = function (state) {
  return {
    dayUserMemoState: state.dayUserMemo,
    navigationState: state.StackNavigation,
  };
};
const mapDispatchToProps = {
  addDairy: actionCreators.dayUserMemoActionCreator.addDairy,
};
export default connect(mapStateToProps, mapDispatchToProps)(Diary);
