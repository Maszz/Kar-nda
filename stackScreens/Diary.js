import React from 'react';
import {View, Text} from 'native-base';
import {Button} from 'native-base';
function Diary({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello world</Text>
      <Button
        onPress={() => {
          navigation.goBack();
        }}>
        Go back
      </Button>
    </View>
  );
}

export default Diary;
