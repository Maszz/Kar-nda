import React, {useState, useEffect} from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ActionButton from 'react-native-action-button';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
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
      <ActionButton
        buttonColor="#7CC2FF"
        style={{marginBottom: 10}}
        bgColor="rgba(0,0,0,0.5)">
        <ActionButton.Item
          buttonColor="#64748B"
          title="To do Task"
          textContainerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          textStyle={{
            color: '#fff',
            fontSize: 13,
            letterSpacing: 1,
          }}
          onPress={() => openModal()}>
          <Image
            source={require('../assets/icons/format-list-checks.png')}
            style={{width: 30, height: 30}}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#64748B"
          title={t('common:diary')}
          textContainerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          textStyle={{
            color: '#fff',
            fontSize: 13,
            letterSpacing: 1,
          }}
          onPress={() => {
            navigationState.navigation.navigate('DairyScreen', {
              date: moment(new Date(Date.now()))
                .tz(RNLocalize.getTimeZone())
                .format()
                .split('T')[0],
            });
          }}>
          <Image
            source={require('../assets/icons/book-open-page-variant-outline.png')}
            style={{width: 30, height: 30}}
          />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#64748B"
          title={t('common:events')}
          textContainerStyle={{
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          }}
          textStyle={{
            color: '#fff',
            fontSize: 13,
            letterSpacing: 1,
          }}
          onPress={() => {
            navigationState.navigation.navigate('AddEventScreen');
          }}>
          <Image
            source={require('../assets/icons/draw-pen.png')}
            style={{width: 30, height: 30}}
          />
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
