import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CustomStatusBar from './components/CustomStatusBar';
import MainNavigator from './components/MainNavigator';
import reducer from './reducers';
import { black } from './utils/colors';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1, backgroundColor: black }}>
          <CustomStatusBar backgroundColor={black} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
