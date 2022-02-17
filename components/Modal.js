import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Modal, Center, Button, FormControl, Input, Text } from 'native-base';
import { Dimensions } from 'react-native';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

const Example = ({ isShowModal }) => {
  const showModal = useSelector(state => state.calendarModal);

  const dispatch = useDispatch();

  const { onCalendarDayPress } = bindActionCreators(
    actionCreators.calendarModalActionCreator,
    dispatch,
  );
  return (
    <Center>
      {/* <Button onPress={() => onCalendarDayPress(true)}>Button</Button> */}
      <Modal
        isOpen={showModal.isVisible}
        onClose={() => onCalendarDayPress(false)}
        size="xl">
        <Modal.Content
          maxWidth={Dimensions.get('window').width - 35}
          maxHeight={Dimensions.get('window').height - 200}>
          <Modal.CloseButton />
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>
            <Text>Modal Body</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  onCalendarDayPress(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  onCalendarDayPress(false);
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
export default Example;
