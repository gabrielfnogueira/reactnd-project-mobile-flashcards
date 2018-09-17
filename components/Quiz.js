import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { black, green, red, white } from '../utils/colors';
import Card from './Card';
import CustomTouchable from './CustomTouchable';
import QuizResult from './QuizResult';

class Quiz extends Component {
  state = {
    currentQuestion: 1,
    totalQuestions: this.props.deck.questions.length,
    correctCount: 0,
    showResult: false
  };

  markCorrect = () => {
    this.setState(
      prevState => ({ correctCount: prevState.correctCount + 1 }),
      this.nextCard
    );
  };

  nextCard = () => {
    const { currentQuestion, totalQuestions } = this.state;

    if (currentQuestion === totalQuestions) {
      this.setState({ showResult: true });
    } else {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion + 1
      }));
    }
  };

  resetQuiz = () => {
    this.setState({
      currentQuestion: 1,
      correctCount: 0,
      showResult: false
    });
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const {
      currentQuestion,
      totalQuestions,
      correctCount,
      showResult
    } = this.state;
    const { deck } = this.props;
    const question = deck.questions[currentQuestion - 1];

    if (showResult) {
      return (
        <QuizResult
          totalQuestions={totalQuestions}
          correctCount={correctCount}
          onResetPress={this.resetQuiz}
          onGoBackPress={this.goBack}
        />
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.questionNumber}>
          Question {currentQuestion} of {totalQuestions}
        </Text>
        <Card question={question} />
        <View style={styles.actions}>
          <CustomTouchable onPress={() => this.markCorrect()}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: green }
              ]}
            >
              <Text style={styles.btnText}>Correct</Text>
            </View>
          </CustomTouchable>
          <CustomTouchable onPress={this.nextCard}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: red }
              ]}
            >
              <Text style={styles.btnText}>Incorrect</Text>
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
    backgroundColor: black,
    justifyContent: 'space-between'
  },
  questionNumber: {
    color: white,
    fontSize: 20
  },
  actions: {
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

Quiz = connect(mapStateToProps)(Quiz);

export default Quiz;
