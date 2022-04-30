import React, {useState, useEffect} from 'react';
import {
  Button,
  Box,
  FormControl,
  Stack,
  View,
  Text,
  Input,
  TextArea,
  HStack,
  VStack,
  Spacer,
} from 'native-base';
import {Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useSelector, connect} from 'react-redux';
import {Styles} from '../styles';
import {actionCreators} from '../state/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useTranslation} from 'react-i18next';

import PushNotification from 'react-native-push-notification';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorPicker from 'react-native-color-picker-ios';

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

const AddEventScreen = ({navigation, addEvent, events, notification}) => {
  // const events = useSelector(state => state.events);
  // const dispatch = useDispatch();

  // const {addEvent, removeEvent, resetEventList} = bindActionCreators(
  //   actionCreators.eventsActionCreator,
  //   dispatch,
  // );
  const [tagColor, setTagColor] = useState('#4AA9FF');
  const colorPress = () => {
    ColorPicker.showColorPicker(
      {supportsAlpha: false, initialColor: 'cyan'},
      color => {
        setTagColor(color);
      },
    );
  };
  const {t} = useTranslation();
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date(),
    start: new Date(),
    end: new Date(),
    title: '',
    description: '',
    location: '',
  });
  const scheduleNotifications = (title, message, date) => {
    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: date,
      allowWhileIdle: true,
      id: title + '-' + date.toISOString(),
    });
  };
  const submitEvent = () => {
    console.log(formData.start.getTime(), formData.end.getTime());

    const formmatedDate = formData.date.toISOString().split('T')[0];
    const formmatedStartTime = formData.start.toISOString().split('T')[1];
    const formmatedEndTime = formData.end.toISOString().split('T')[1];
    const formattedStart = `${formmatedDate}T${formmatedStartTime}`;
    const formattedend = `${formmatedDate}T${formmatedEndTime}`;
    console.log('add section');
    console.log(formattedStart, formattedend);
    const state = {
      title: formData.title,
      description: formData.description,
      start: formattedStart,
      end: formattedend,
      location: formData.location,
      tagColor: tagColor,
    };
    console.log('Notification :', notification);
    if (notification) {
      scheduleNotifications(
        formData.title,
        formData.description,
        new Date(formattedStart),
      );
    }
    addEvent(state, notification);
  };

  return (
    <DissmissKeyboard>
      <View
        style={{backgroundColor: '#1F2937', height: '100%'}}
        showsHorizontalScrollIndicator={false}>
        <VStack width="100%" style={{alignItems: 'center'}}>
          <Box style={{alignSelf: 'flex-end', padding: 15}}>
            <Button
              variant="unstyled"
              onPress={() => {
                console.log('Save');
                if (formData.start.getTime() > formData.end.getTime()) {
                  console.log('error date');
                  Alert.alert('InvalidDate', 'Please Insert collect date.');
                } else if (
                  formData.title === '' ||
                  formData.description === ''
                ) {
                  console.log('Invalid', 'Event empty');
                  Alert.alert('Empty Field', `Don't let field be empty.`);
                } else {
                  submitEvent();
                  navigation.goBack();
                }
              }}>
              <Text style={{color: Styles.globalStyles.textPrimaryColor}}>
                {t('common:save')}
              </Text>
            </Button>
          </Box>
          <Box w="90%">
            <HStack alignItems="center" marginRight={4}>
              <TouchableOpacity
                onPress={() => {
                  colorPress();
                  console.log('Press');
                }}>
                <Box
                  w={21}
                  h={21}
                  bgColor={tagColor}
                  rounded="md"
                  marginRight={4}
                />
              </TouchableOpacity>

              <Input
                color="white"
                placeholder={t('common:addActivity')}
                variant="underlined"
                size="2xl"
                width={'90%'}
                selectionColor={Styles.globalStyles.textPrimaryColor}
                value={formData.title}
                onChangeText={text => {
                  setFormData({
                    start: formData.start,
                    end: formData.end,
                    date: formData.date,
                    title: text,
                    description: formData.description,
                    location: formData.location,
                  });
                }}
              />
            </HStack>
            <VStack mx="4">
              <VStack style={{marginTop: 20}}>
                <Box style={{marginVertical: 5}}>
                  <HStack style={{alignItems: 'center'}}>
                    <Ionicons
                      name="ios-today"
                      size={14}
                      color="#fff"
                      style={{marginRight: 4}}
                    />
                    <Text
                      style={{
                        color: Styles.globalStyles.textPrimaryColor,
                      }}>
                      {t('common:date')}
                    </Text>
                    <Spacer />
                    <Box style={{width: 150, alignSelf: 'flex-end'}}>
                      <DateTimePicker
                        display="default"
                        mode="date"
                        value={formData.date}
                        onChange={(e, d) => {
                          setFormData({
                            start: formData.start,
                            end: formData.end,
                            date: d,
                            title: formData.title,
                            description: formData.description,
                            location: formData.location,
                          });
                        }}
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box style={{marginVertical: 5}}>
                  <HStack
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        marginHorizontal: 'auto',
                        color: Styles.globalStyles.textPrimaryColor,
                      }}>
                      {t('common:startTime')}
                    </Text>
                    <Spacer />
                    <Box style={{width: 100, alignSelf: 'flex-end'}}>
                      <DateTimePicker
                        display="default"
                        mode="time"
                        value={formData.start}
                        onChange={(e, d) => {
                          setFormData({
                            start: d,
                            end: formData.end,
                            date: formData.date,
                            title: formData.title,
                            description: formData.description,
                            location: formData.location,
                          });
                        }}
                      />
                    </Box>
                  </HStack>
                </Box>
                <Box style={{marginVertical: 5}}>
                  <HStack style={{alignItems: 'center'}}>
                    <Text
                      style={{
                        color: Styles.globalStyles.textPrimaryColor,
                      }}>
                      {t('common:endTime')}
                    </Text>
                    <Spacer />
                    <Box style={{width: 100, alignSelf: 'flex-end'}}>
                      <DateTimePicker
                        display="default"
                        mode="time"
                        value={formData.end}
                        onChange={(e, d) => {
                          setFormData({
                            start: formData.start,
                            end: d,
                            date: formData.date,
                            title: formData.title,
                            description: formData.description,
                            location: formData.location,
                          });
                        }}
                      />
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </VStack>
            <Box mx="4" marginTop={5}>
              <HStack alignItems="center">
                <EntypoIcon
                  name="map"
                  size={14}
                  color="#fff"
                  style={{marginRight: 4}}
                />
                <Text style={{color: Styles.globalStyles.textPrimaryColor}}>
                  {t('common:location')}
                </Text>
              </HStack>

              <Input
                // defaultValue="12345"
                color="white"
                placeholder={t('common:location')}
                selectionColor={Styles.globalStyles.textPrimaryColor}
                variant="unstyled"
                onChangeText={text => {
                  setFormData({
                    start: formData.start,
                    end: formData.end,
                    date: formData.date,
                    title: formData.title,
                    description: formData.description,
                    location: text,
                  });
                }}
              />
            </Box>
            <Stack mx="4" style={{marginVertical: 5}}>
              <HStack alignItems="center" mb={4}>
                <EntypoIcon
                  name="text"
                  size={14}
                  color="#fff"
                  style={{marginRight: 4}}
                />
                <Text style={{color: Styles.globalStyles.textPrimaryColor}}>
                  {t('common:description')}
                </Text>
              </HStack>

              <TextArea
                h={20}
                color="white"
                style={{color: Styles.globalStyles.textPrimaryColor}}
                placeholder={t('common:descriptionPlaceholder')}
                selectionColor={Styles.globalStyles.textPrimaryColor}
                fontFamily={'Roboto'}
                w="100%"
                maxW="300"
                onChangeText={text => {
                  setFormData({
                    start: formData.start,
                    end: formData.end,
                    date: formData.date,
                    title: formData.title,
                    description: text,
                    location: formData.location,
                  });
                  console.log(formData);
                }}
              />
            </Stack>
          </Box>
          {/* <Text>Hello world</Text>
          <Button
            onPress={() => {
              navigation.goBack();
            }}>
            Go back
          </Button>
          <Button
            onPress={async () => {
              if (formData.start.getTime() > formData.end.getTime()) {
                console.log('error date');
                Alert.alert('InvalidDate', 'Please Insert collect date.');
              } else if (formData.title === '' || formData.description === '') {
                console.log('Invalid', 'Event empty');
                Alert.alert('Empty Field', `Don't let field be empty.`);
              } else {
                submitEvent();
                await navigation.goBack();
              }
            }}>
            Submit
          </Button> */}
        </VStack>
      </View>
    </DissmissKeyboard>
  );
};
const mapStateToProps = function (state) {
  return {
    events: state.events,
    navigationState: state.StackNavigation,
    notification: state.notifications.notification,
  };
};
const mapDispatchToProps = {
  addEvent: actionCreators.eventsActionCreator.addEvent,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddEventScreen);
