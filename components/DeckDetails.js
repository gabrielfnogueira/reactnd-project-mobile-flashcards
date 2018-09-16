import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { deleteDeck } from '../actions';
import { deleteDeck as removeDeck } from '../utils/api';
import { black, blue, paleBlue, red, white, purple } from '../utils/colors';
import CustomTouchable from './CustomTouchable';

class DeckDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    };
  };

  handleDeletePress = () => {
    Alert.alert(
      'Atention',
      'Do you really want to delete this deck?',
      [
        { text: 'NO', onPress: () => {}, style: 'cancel' },
        { text: 'YES', onPress: this.deleteDeck, style: 'destructive' }
      ],
      { cancelable: false }
    );
  };

  deleteDeck = () => {
    const { deckId } = this.props;

    this.props.dispatch(deleteDeck(deckId));

    this.toHome();

    removeDeck(deckId);
  };

  handleAddQuestionPress = () => {
    this.props.navigation.navigate('AddQuestion', {
      deckId: this.props.deckId
    });
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { deck } = this.props;

    if (!deck) {
      return null;
    }

    const title = deck.title;
    const cardNumber = Array.isArray(deck.questions)
      ? deck.questions.length
      : 0;

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckCards}>{cardNumber} cards</Text>
        </View>
        <View style={styles.actions}>
          <CustomTouchable onPress={this.handleDeletePress}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: red }
              ]}
            >
              <Text style={styles.btnText}>Delete deck</Text>
            </View>
          </CustomTouchable>
          <CustomTouchable onPress={this.handleAddQuestionPress}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: purple }
              ]}
            >
              <Text style={styles.btnText}>Add card</Text>
            </View>
          </CustomTouchable>
          <CustomTouchable rippleColor={paleBlue}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: blue }
              ]}
            >
              <Text style={styles.btnText}>Start Quiz</Text>
            </View>
          </CustomTouchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  deckTitle: {
    color: white,
    fontWeight: 'bold',
    fontSize: 26
  },
  deckCards: {
    color: blue,
    opacity: 0.7,
    fontSize: 20
  },
  actions: {
    flex: 1,
    padding: 20
  },
  iosBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  },
  androidBtn: {
    height: 45,
    borderRadius: 2,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId,
    deck: state[deckId]
  };
}

DeckDetails = connect(mapStateToProps)(DeckDetails);

export default DeckDetails;
