import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import { blue } from '../utils/colors';

const CustomTouchable = ({ rippleColor, ...props }) => {
  return Platform.OS === 'ios' ? (
    <TouchableOpacity {...props} />
  ) : (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(rippleColor || blue)}
      {...props}
    />
  );
};

export default CustomTouchable;
