import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { black, blue, paleBlue, white } from '../utils/colors';
import CustomTouchable from './CustomTouchable';

class QuizResult extends Component {
  state = {};
  render() {
    const {
      totalQuestions,
      correctCount,
      onGoBackPress,
      onResetPress
    } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.questionNumber}>
          You've got {correctCount} of {totalQuestions} correct!
        </Text>
        <View style={styles.actions}>
          <CustomTouchable onPress={onGoBackPress}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: paleBlue }
              ]}
            >
              <Text style={styles.btnText}>Go back</Text>
            </View>
          </CustomTouchable>
          <CustomTouchable onPress={onResetPress}>
            <View
              style={[
                Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn,
                { backgroundColor: blue }
              ]}
            >
              <Text style={styles.btnText}>Restart Quiz</Text>
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

export default QuizResult;
