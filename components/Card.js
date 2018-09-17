import React, { Component } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { black, blue, white } from '../utils/colors';

class Card extends Component {
  state = {
    showingQuestion: true
  };

  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    this.value = 0;

    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.question.question !== this.props.question.question &&
      !this.state.showingQuestion
    ) {
      this.flipCard();
    }
  }

  flipCard = () => {
    if (this.value >= 90) {
      this.setState({ showingQuestion: true }, () => {
        Animated.spring(this.animatedValue, {
          toValue: 0,
          friction: 8,
          tension: 10
        }).start();
      });
    } else {
      this.setState({ showingQuestion: false }, () => {
        Animated.spring(this.animatedValue, {
          toValue: 180,
          friction: 8,
          tension: 10
        }).start();
      });
    }
  };

  render() {
    const { question } = this.props;

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };

    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.flipCard} style={styles.touchable}>
          <Animated.View
            style={[
              styles.card,
              frontAnimatedStyle,
              { opacity: this.frontOpacity }
            ]}
          >
            <Text style={styles.textType}>Question:</Text>
            <Text style={styles.text}>{question.question}</Text>
            <Text style={styles.flipText}>See answer</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.card,
              styles.cardBack,
              backAnimatedStyle,
              { opacity: this.backOpacity }
            ]}
          >
            <Text style={styles.textType}>Answer:</Text>
            <Text style={styles.text}>{question.answer}</Text>
            <Text style={styles.flipText}>See question</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: black
  },
  touchable: {
    flex: 1,
    padding: 20
  },
  card: {
    flexBasis: '100%',
    backgroundColor: blue,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    justifyContent: 'space-around'
  },
  cardBack: {
    position: 'absolute',
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  },
  textType: {
    color: white,
    fontSize: 35
  },
  text: {
    color: white,
    fontSize: 75
  },
  flipText: {
    color: black,
    opacity: 0.7,
    fontSize: 20
  }
});

export default Card;
