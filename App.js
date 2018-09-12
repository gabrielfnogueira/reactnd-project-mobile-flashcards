import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CustomStatusBar from './components/CustomStatusBar';
import MainNavigator from './components/MainNavigator';
import reducer from './reducers';
import { lightGray } from './utils/colors';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor={lightGray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
