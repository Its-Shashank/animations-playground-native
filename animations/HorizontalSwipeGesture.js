import React from 'react';
import { Dimensions } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Page from '../components/Page';

const HorizontalSwipeGesture = () => {
  const WORDS = ["What's", "Up", "Fellow", "Devs"];

  const translateX = useSharedValue(0);
  
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  
  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      decelerationRate="fast"
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      {WORDS.map((title, index) => (
        <Page key={index.toString()} title={title} index={index} translateX={translateX} />
      ))}
    </Animated.ScrollView>
  )
}

export default HorizontalSwipeGesture;
