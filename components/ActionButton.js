import React, {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/dist/Ionicons';

import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import AddEventModal from './AddEventModal';
import {Container, Box} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
const ActionButtonComponent = props => {
  const navigationState = useSelector(state => state.StackNavigation);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <ActionButton buttonColor="#7CC2FF" style={{marginBottom: 10}}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="To do Task"
          onPress={() => openModal()}>
          <Icon name="create-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Dairy"
          onPress={() => {
            navigationState.navigation.navigate('DairyScreen');
          }}>
          <Icon name="notifications-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="All Events"
          onPress={() => {
            navigationState.navigation.navigate('AddEventScreen');
          }}>
          <Icon name="checkmark-done-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      <AddEventModal showModal={showModal} closeModal={closeModal} />
    </>
  );
};
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default ActionButtonComponent;
