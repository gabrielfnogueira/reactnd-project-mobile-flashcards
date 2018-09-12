import { Constants } from 'expo';
import React from 'react';
import { StatusBar, View } from 'react-native';

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

export default CustomStatusBar;
