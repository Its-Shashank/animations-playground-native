import React from 'react';
import { Dimensions, View, StyleSheet, Text } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const SIZE = width * 0.7;

const Page = ({ index, translateX, title }) => {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0]
    )

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0]
    )
    return {
      transform: [{ scale }],
      borderRadius
    }
  });

  const rTextStyle = useAnimatedStyle(() => {

    const translateY = interpolate(translateX.value, inputRange, [height / 2 , 0, -height / 2]);
    const opacity = interpolate(translateX.value, inputRange, [-1, 1, -1]);
    
    return {
      opacity,
      transform: [
        { translateY }
      ]
    }
  });
  
  return (
    <View
      style={[styles.pageContainer,
      { backgroundColor: `rgba(0, 0, 255, 0.${index + 2})` }]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[rTextStyle, { position: 'absolute' }]}>
        <Text style={styles.text}>{title.toUpperCase()}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'rgba(0, 0, 255, 0.4)'
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 70
  },
});

export default Page;
