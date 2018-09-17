import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import {
  black,
  blue,
  green,
  paleBlue,
  red,
  white,
  yellow
} from '../utils/colors';
import CustomTouchable from './CustomTouchable';

class QuizResult extends Component {
  state = {
    opacity: new Animated.Value(0),
    fontSize: new Animated.Value(0)
  };

  componentDidMount() {
    const { opacity, fontSize } = this.state;

    Animated.timing(opacity, { toValue: 1, duration: 750 }).start();
    Animated.spring(fontSize, { toValue: 100, bounciness: 15 }).start();
  }

  render() {
    const { opacity, fontSize } = this.state;
    const {
      totalQuestions,
      correctCount,
      onGoBackPress,
      onResetPress
    } = this.props;

    const percentage = (correctCount / totalQuestions) * 100;
    let percentageColor = white;

    if (percentage < 50) {
      percentageColor = red;
    } else if (percentage < 75) {
      percentageColor = yellow;
    } else {
      percentageColor = green;
    }

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.result, { opacity: opacity }]}>
          <Animated.Text
            style={[
              styles.resultPercentage,
              { color: percentageColor, fontSize }
            ]}
          >
            {percentage.toFixed(0)}%
          </Animated.Text>
          <Text style={styles.resultText}>
            You've got {correctCount} of {totalQuestions} correct!
          </Text>
        </Animated.View>
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
  result: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  resultPercentage: {
    color: white,
    fontWeight: 'bold',
    fontSize: 100
  },
  resultText: {
    color: blue,
    opacity: 0.7,
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
