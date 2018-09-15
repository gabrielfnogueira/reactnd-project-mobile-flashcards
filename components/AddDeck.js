import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { addDeck as saveDeck } from '../utils/api';
import { black, darkGray, lightGray, white } from '../utils/colors';
import uuidv4 from '../utils/uuidv4';
import SubmitBtn from './SubmitBtn';

class AddDeck extends Component {
  state = {
    title: ''
  };

  handleInputChange = text => this.setState({ title: text });

  handleSubmit = () => {
    const newDeck = { [uuidv4()]: { title: this.state.title } };

    this.props.dispatch(addDeck(newDeck));

    this.setState({ title: '' });

    this.toHome();

    saveDeck(newDeck);
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }));
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput style={styles.input} onChangeText={this.handleInputChange} value={title} />
        <SubmitBtn onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: black
  },
  box: {
    flex: 1,
    padding: 20,
    backgroundColor: darkGray,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: white,
    fontSize: 30,
    marginBottom: 20
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: lightGray,
    padding: 10,
    color: white,
    fontSize: 22,
    marginBottom: 20
  }
});

AddDeck = connect()(AddDeck);

export default AddDeck;
