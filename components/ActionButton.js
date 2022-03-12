import React, {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/dist/Ionicons';

import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const ActionButtonComponent = () => {
  return (
    <ActionButton buttonColor="#7CC2FF" style={{marginBottom: 10}}>
      <ActionButton.Item
        buttonColor="#9b59b6"
        title="New Task"
        onPress={() => console.log('notes tapped!')}>
        <Icon name="create-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#3498db"
        title="Notifications"
        onPress={() => {}}>
        <Icon name="notifications-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor="#1abc9c"
        title="All Tasks"
        onPress={() => {}}>
        <Icon name="checkmark-done-outline" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
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
