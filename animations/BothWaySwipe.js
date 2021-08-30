import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import SwipeableCard from '../components/SwipeableCard';

const WORDS = ["What's", "Up", "Fellow", "Devs"];
const { height, width } = Dimensions.get('window');


const BothWaySwipe = () => {
  return (
    <Animated.View style={styles.cardsContainer}>
      {WORDS.map((title, index) => <SwipeableCard key={index.toString()} title={title} index={index} />)}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  cardsContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default BothWaySwipe;
