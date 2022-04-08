import React, {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/dist/Ionicons';

import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import AddEventModal from './AddEventModal';
import {Container, Box} from 'native-base';
import {useDispatch, useSelector, connect} from 'react-redux';
import moment from 'moment';
import * as RNLocalize from 'react-native-localize';
import {useTranslation} from 'react-i18next';

const ActionButtonComponent = ({navigationState}) => {
  // const navigationState = useSelector(state => state.StackNavigation);
  const {t, i18n} = useTranslation();

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
          title={t('common:diary')}
          onPress={() => {
            navigationState.navigation.navigate('DairyScreen', {
              date: moment(new Date(Date.now()))
                .tz(RNLocalize.getTimeZone())
                .toISOString()
                .split('T')[0],
            });
          }}>
          <Icon name="notifications-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title={t('common:events')}
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

const mapStateToProps = function (state) {
  return {
    navigationState: state.StackNavigation,
  };
};

export default connect(mapStateToProps)(ActionButtonComponent);
