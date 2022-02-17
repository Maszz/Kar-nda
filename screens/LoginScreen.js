import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeProvider, Button, Input, Image} from 'react-native-elements';
import {collection, addDoc} from 'firebase/firestore';
import {db} from '../database/DB';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../state/index';

const LoginScreen = props => {
  const state = useSelector(state => state.user);

  const dispatch = useDispatch();

  const {onChangeTextField, resetTextFieldState} = bindActionCreators(
    actionCreators.userActionCreator,
    dispatch,
  );

  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={styles.container}>
        <Text>Hello World</Text>
        <Image
          source={require('.././assets/react-native-firebase-logo-vector.png')}
          style={{width: 200, height: 200}}
          containerStyle={{marginLeft: 'auto', marginRight: 'auto'}}
        />
        <Input
          leftIcon={<Icon name="user-o" size={20} color="#0085E6" />}
          placeholder={'  Name'}
          onChangeText={value => {
            onChangeTextField(value, 'name');
            console.log();
          }}
          value={state.name}
        />
        <Input
          leftIcon={<Icon name="envelope-o" size={20} color="#0085E6" />}
          placeholder={'  Email'}
          onChangeText={value => onChangeTextField(value, 'email')}
          value={state.email}
        />
        <Button
          icon={<Icon name="sign-in" size={15} color="#fff" />}
          title="  Login"
          onPress={async () => {
            if (state.name != '') {
              try {
                const docRef = await addDoc(
                  collection(db, 'somedata-Collection'),
                  {
                    name: state.name,
                    email: state.email,
                  },
                );
                console.log('Document written with ID: ', docRef.id);
              } catch (e) {
                console.error('Error adding document: ', e);
              }
              props.navigation.navigate('MainScreen');
              resetTextFieldState();
            } else {
              alert('fill at least your name');
            }
          }}
        />
        <Button
          icon={<Icon name="sign-in" size={15} color="#fff" />}
          title="  Register"
          containerStyle={{marginTop: 10}}
        />

        <Button
          icon={<Icon name="map" size={15} color="#fff" />}
          title="  ReduxDemo"
          containerStyle={{marginTop: 10}}
          onPress={() => {
            props.navigation.navigate('ReduxScreen');
          }}
        />
      </ScrollView>
    </ThemeProvider>
  );
};

const theme = {
  Button: {
    raised: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  preloader: {
    prosition: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
