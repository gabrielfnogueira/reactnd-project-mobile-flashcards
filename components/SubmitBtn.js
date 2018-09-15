import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { lightBlue, white } from '../utils/colors';

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: lightBlue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: lightBlue,
    height: 45,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SubmitBtn;
