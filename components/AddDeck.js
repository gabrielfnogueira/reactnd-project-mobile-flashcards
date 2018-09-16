import { Formik } from 'formik';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { addDeck as saveDeck } from '../utils/api';
import { black, lightGray, white } from '../utils/colors';
import uuidv4 from '../utils/uuidv4';
import SubmitBtn from './SubmitBtn';

class AddDeck extends Component {
  newDeck = {
    title: ''
  };

  handleInputChange = text => this.setState({ title: text });

  validateForm = values => {
    const errors = {};

    if (!values.title) {
      errors.title = "Please inform the deck's title.";
    }

    return errors;
  };

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);

    const newDeck = { [uuidv4()]: values };

    this.props.dispatch(addDeck(newDeck));

    resetForm();

    this.toHome();

    saveDeck(newDeck);
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Formik
          validate={this.validateForm}
          onSubmit={this.handleSubmit}
          initialValues={this.newDeck}
        >
          {({ handleChange, handleSubmit, values, isSubmitting, isValid }) => (
            <View>
              <Text style={styles.title}>
                What is the title of your new deck?
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('title')}
                value={values.title}
              />
              <SubmitBtn
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                log={true}
              />
            </View>
          )}
        </Formik>
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
