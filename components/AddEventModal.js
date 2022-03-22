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

const AddEventModal = ({showModal, closeModal, setShowModal}) => {
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => closeModal()} size="xl">
        <Modal.Content height="lg">
          {/* <Modal.CloseButton /> */}
          <Modal.Header>Contact Us</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>
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
