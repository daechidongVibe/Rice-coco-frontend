import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { COLOR } from '../constants/color';
import { styles } from '../shared/index';
import ALERT from '../constants/alert';
const FinalQuestion = ({
  modalVisible,
  setModalVisible,
  question,
  onClickYes,
}) => {
  return (
    <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{ALERT.YES}</Text>
          <View style={styles.buttonWrap}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: COLOR.LIGHT_BLUE }}
              onPress={() => {
                onClickYes();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>{}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: COLOR.LIGHT_BLUE }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>아니요</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FinalQuestion;
