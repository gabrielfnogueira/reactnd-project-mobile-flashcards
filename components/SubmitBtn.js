import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { blue, paleBlue, white } from '../utils/colors';
import CustomTouchable from './CustomTouchable';

const SubmitBtn = ({ onPress }) => {
  return (
    <CustomTouchable onPress={onPress} rippleColor={paleBlue} useForeground={true}>
      <View style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
      </View>
    </CustomTouchable>
  );
};

const styles = StyleSheet.create({
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  iosSubmitBtn: {
    backgroundColor: blue,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    backgroundColor: blue,
    height: 45,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default SubmitBtn;
