import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import { black, blue, lightGray, white } from '../utils/colors';
import CustomTouchable from './CustomTouchable';

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    const { dispatch } = this.props;

    fetchDecks()
      .then(decks => {
        dispatch(receiveDecks(decks));
      })
      .then(() => this.setState({ ready: true }));
  }

  renderDeck = ({ item }) => {
    const cardNumber = Array.isArray(item.questions)
      ? item.questions.length
      : 0;

    return (
      <CustomTouchable
        onPress={() =>
          this.props.navigation.navigate('DeckDetails', {
            deckId: item.id,
            title: item.title
          })
        }
      >
        <View style={styles.deck}>
          <Text style={styles.deckTitle}>{item.title}</Text>
          <Text style={styles.deckCards}>
            {cardNumber} {cardNumber === 1 ? 'card' : 'cards'}
          </Text>
        </View>
      </CustomTouchable>
    );
  };

  render() {
    if (!this.state.ready) {
      return <AppLoading />;
    }

    const { decks } = this.props;
    const decksList = Object.keys(decks).map(id => ({ id, ...decks[id] }));

    return (
      <View style={styles.container}>
        {decksList.length > 0 ? (
          <FlatList
            data={decksList}
            renderItem={this.renderDeck}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.noDeckContainer}>
            <Text style={styles.noDeckText}>No decks yet.</Text>
            <Text style={styles.noDeckText}>Why don't you create one?</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  noDeckContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDeckText: {
    color: white,
    fontSize: 20
  },
  deck: {
    borderBottomWidth: 1,
    borderColor: lightGray,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
});

Decks = connect(state => ({
  decks: state
}))(Decks);

export default Decks;
