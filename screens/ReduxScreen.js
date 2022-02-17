import React, {useState, useEffect} from 'react';

import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';
import {Text, Button, ThemeProvider} from 'react-native-elements';
import {View} from 'react-native';

const TestRedux = props => {
  const state = useSelector(state => state.bank);

  const dispatch = useDispatch();

  const {depositMoney, withdrawMoney} = bindActionCreators(
    actionCreators.bankActionCreator,
    dispatch,
  );

  console.log(state);

  return (
    <ThemeProvider theme={theme}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>{state}</Text>
        <Button title="Deposit" onPress={() => depositMoney(1000)}></Button>
        <Button title="Withdraw" onPress={() => withdrawMoney(1000)}></Button>
      </View>
    </ThemeProvider>
  );
};
const theme = {
  Button: {
    raised: true,
  },
};

export default TestRedux;
