import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import { lightBlue, lightGray } from '../utils/colors';
import AddDeck from './AddDeck';
import Decks from './Decks';

const routes = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="material-book" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
    }
  }
};

const tabOptions = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? lightGray : lightBlue,
    indicatorStyle: {
      backgroundColor: lightBlue
    },
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? lightBlue : lightGray,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tabs =
  Platform.OS === 'ios'
    ? createBottomTabNavigator(routes, tabOptions)
    : createMaterialTopTabNavigator(routes, tabOptions);

export default (MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    navigationOptions: {
      headerForceInset: {
        top: 'never'
      }
    }
  }
));
