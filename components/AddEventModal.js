import React, {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/dist/Ionicons';

import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  Box,
  Center,
  Modal,
  FormControl,
  Button,
  Input,
} from 'native-base';
import {actionCreators} from '../state/';
import {bindActionCreators} from 'redux';

import {useDispatch, useSelector} from 'react-redux';
import {Styles} from '../styles';
const AddEventModal = ({showModal, closeModal, setShowModal}) => {
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const selectedDateState = useSelector(
    state => state.selectedDate.selectedDateState,
  );
  const todoListItems = useSelector(state => state.todoList);
  const dispatch = useDispatch();
  const {setTodoList} = bindActionCreators(
    actionCreators.todoListActionCreator,
    dispatch,
  );
  const addItem = todoTitle => {
    const temp = [
      ...list,
      {
        todoTitle: todoTitle,
        ischecked: false,
      },
    ];
    // console.log({
    //   date: selectedDateState.format().split('T')[0],
    //   todoItem: temp,
    // });
    setTodoList({
      date: selectedDateState.format().split('T')[0],
      todoItem: temp,
    });
  };
  useEffect(() => {
    const currentDate = selectedDateState.format().split('T')[0];

    const todolistDays = Object.keys(todoListItems.todoItem);
    console.log(todolistDays);
    setList([]);

    for (const key of todolistDays) {
      if (key == currentDate) {
        setList(todoListItems.todoItem[key]);
        console.log('incase');
        break;
      }
    }
  }, [selectedDateState, todoListItems]);

  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={() => closeModal()}
        size="xs"
        bgColor={'rgba(0,0,0,0.5)'}>
        <Modal.Content
          minHeight={150}
          bgColor={Styles.globalStyles.primaryColor}>
          {/* <Modal.CloseButton /> */}
          <Modal.Body syyle={{paddingTop: 5}}>
            <Text style={{color: '#fff', alignSelf: 'center'}}>
              Add Todo list
            </Text>
            <FormControl style={{marginTop: 10}}>
              {/* <FormControl.Label>Todo Task</FormControl.Label> */}
              <Input
                flex={1}
                onChangeText={v => setInputValue(v)}
                value={inputValue}
                color={'#fff'}
                placeholder="Add Task"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bgColor={Styles.globalStyles.primaryColor}>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  closeModal();
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  addItem(inputValue);
                  setInputValue('');
                  closeModal();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default AddEventModal;
