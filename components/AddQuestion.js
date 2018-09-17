import { Formik } from 'formik';
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { addQuestion } from '../actions';
import { addCardToDeck } from '../utils/api';
import { black, lightGray, white } from '../utils/colors';
import SubmitBtn from './SubmitBtn';

class AddQuestion extends Component {
  newQuestion = {
    question: '',
    answer: ''
  };

  static navigationOptions = () => {
    return {
      title: 'Add card'
    };
  };

  validateForm = values => {
    const errors = {};

    if (!values.question || !values.question.trim()) {
      errors.question = 'Please inform the question.';
    }

    if (!values.answer || !values.answer.trim()) {
      errors.answer = 'Please inform the answer.';
    }

    return errors;
  };

  handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    const { deckId } = this.props;

    const question = { ...values };

    this.props.dispatch(addQuestion(deckId, question));

    resetForm();

    this.goBack();

    addCardToDeck(deckId, question);
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Formik
          validate={this.validateForm}
          onSubmit={this.handleSubmit}
          initialValues={this.newQuestion}
        >
          {({ handleChange, handleSubmit, values, isSubmitting, isValid }) => (
            <View>
              <Text style={styles.title}>Question:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('question')}
                value={values.question}
              />
              <Text style={styles.title}>Answer</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('answer')}
                value={values.answer}
              />
              <SubmitBtn
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
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

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deckId
  };
}

AddQuestion = connect(mapStateToProps)(AddQuestion);

export default AddQuestion;
