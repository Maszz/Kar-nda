import React, {useState} from 'react';
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
} from 'native-base';
import {Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';

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
import CalendarPicker from 'react-native-calendar-picker';
import DateSelector from '../components/dateSelector';
const AddtitleScreen = ({navigation}) => {
  const events = useSelector(state => state.events);
  const dispatch = useDispatch();

  const {addEvent, removeEvent, resetEventList} = bindActionCreators(
    actionCreators.eventsActionCreator,
    dispatch,
  );
  const [formData, setFormData] = useState({
    date: new Date(),
    start: new Date(),
    end: new Date(),
    title: '',
    description: '',
  });
  const submitEvent = () => {
    console.log(formData.start.getTime(), formData.end.getTime());

    const formmatedDate = formData.date.toISOString().split('T')[0];
    const formmatedStartTime = formData.start.toISOString().split('T')[1];
    const formmatedEndTime = formData.end.toISOString().split('T')[1];
    const formattedStart = `${formmatedDate}T${formmatedStartTime}`;
    const formattedend = `${formmatedDate}T${formmatedEndTime}`;
    console.log(formattedStart, formattedend);
    const state = {
      title: formData.title,
      description: formData.description,
      start: formattedStart,
      end: formattedend,
    };
    addEvent(state);
  };
  return (
    <DissmissKeyboard>
      <ScrollView
        style={{backgroundColor: '#1F2937'}}
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
              <Text style={{color: 'white'}}>Save</Text>
            </Button>
          </Box>
          <Box w="90%">
            <FormControl>
              <VStack mx="4">
                <Input
                  color="white"
                  placeholder="Add Activity"
                  variant="underlined"
                  size="2xl"
                  value={formData.title}
                  onChangeText={text => {
                    setFormData({
                      start: formData.start,
                      end: formData.end,
                      date: formData.date,
                      title: text,
                      description: formData.description,
                    });
                  }}
                />

                <VStack style={{marginTop: 20}}>
                  <Box style={{marginVertical: 5}}>
                    <HStack style={{alignItems: 'space-between'}}>
                      <Text
                        style={{
                          alignSelf: 'flex-start',
                          color: 'white',
                        }}>
                        Date
                      </Text>
                      <Spacer />
                      <Box style={{width: 125, alignSelf: 'flex-end'}}>
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
                            });
                          }}
                        />
                      </Box>
                    </HStack>
                  </Box>
                  <Box style={{marginVertical: 5}}>
                    <HStack
                      style={{
                        alignItems: 'space-between',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          alignSelf: 'flex-start',
                          marginHorizontal: 'auto',
                          color: 'white',
                        }}>
                        Start Time
                      </Text>
                      <Spacer />
                      <Box style={{width: 100, alignSelf: 'flex-end'}}>
                        <DateTimePicker
                          display="default"
                          mode="time"
                          value={formData.start}
                          onChange={(e, d) => {
                            console.log(d.toISOString().split('T')[1]);
                            setFormData({
                              start: d,
                              end: formData.end,
                              date: formData.date,
                              title: formData.title,
                              description: formData.description,
                            });
                          }}
                        />
                      </Box>
                    </HStack>
                  </Box>
                  <Box style={{marginVertical: 5}}>
                    <HStack style={{alignItems: 'space-between'}}>
                      <Text
                        style={{
                          alignSelf: 'flex-start',
                          color: 'white',
                        }}>
                        End Time
                      </Text>
                      <Spacer />
                      <Box style={{width: 100, alignSelf: 'flex-end'}}>
                        <DateTimePicker
                          display="default"
                          mode="time"
                          value={formData.end}
                          onChange={(e, d) => {
                            console.log(d.toISOString().split('T')[1]);
                            setFormData({
                              start: formData.start,
                              end: d,
                              date: formData.date,
                              title: formData.title,
                              description: formData.description,
                            });
                          }}
                        />
                      </Box>
                    </HStack>
                  </Box>
                </VStack>
              </VStack>
              <Stack mx="4" style={{marginVertical: 5}}>
                <FormControl.Label>
                  <Text style={{color: 'white'}}>Description</Text>
                </FormControl.Label>
                {/* <Input
                // defaultValue="12345"
                placeholder="Description"
                variant="underlined"
              /> */}
                <TextArea
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
                />
              </Stack>
            </FormControl>
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
      </ScrollView>
    </DissmissKeyboard>
  );
};

export default AddtitleScreen;
