import React, {useRef} from 'react';
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
const DissmissKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log('sda');
      }}>
      {children}
    </TouchableWithoutFeedback>
  );
};

function Diary({navigation}) {
  const richText = useRef();
  return (
    <DissmissKeyboard>
      <ScrollView style={{backgroundColor: '#1F2937'}}>
        <VStack>
          <Box style={{alignSelf: 'flex-end', padding: 15}}>
            <Button
              variant="unstyled"
              onPress={() => {
                console.log('Save');
              }}>
              <Text style={{color: 'white'}}> Save</Text>
            </Button>
          </Box>
          <Box
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Input variant="unstyled" placeholder="Title The days" size="2xl" />

            <Divider width="60%" />
            <Text>Time / Day / Year</Text>
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
                  editorStyle={{backgroundColor: '#1F2937'}}
                  ref={richText}
                  onChange={descriptionText => {
                    console.log('descriptionText:', descriptionText);
                  }}
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
