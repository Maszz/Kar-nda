import React, {setState} from 'react';
import {NavigationComponent, Modal as RNNModal} from 'react-native-navigation';
import {Button} from 'native-base';
const Modal2 = ({showModal, closeModal}) => {
  const toggleModal = () => setVisible(!visible);
  return (
    <RNNModal
      //   onShow={/* optional callback */}
      //   animationType={/* optional, 'none' | 'fade' | 'slide', default 'slide'*/}
      //   blurOnUnmount={/* optional, default false */}
      //   transparent={/* optional, default false, true behaves as overCurrentContext */}
      visible={showModal}
      onRequestClose={() => closeModal()}>
      <Button
        label="Dismiss declared Modal"
        onPress={() => {
          closeModal();
        }}
      />
    </RNNModal>
  );
};

export default Modal2;
