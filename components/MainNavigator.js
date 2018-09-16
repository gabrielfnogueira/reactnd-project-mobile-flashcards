import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { black, blue } from '../utils/colors';
import AddDeck from './AddDeck';
import DeckDetails from './DeckDetails';
import Decks from './Decks';

const routes = {
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-book" size={30} color={tintColor} />
      )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  }
};

const tabOptions = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: blue,
    indicatorStyle: {
      backgroundColor: blue
    },
    style: {
      height: 56,
      backgroundColor: black,
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
    },
    DeckDetails: {
      screen: DeckDetails,
      navigationOptions: {
        headerTintColor: blue,
        headerStyle: {
          backgroundColor: black
        }
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
