import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

export default function SimplePalmGesture () {

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    }
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value
        }
      ],
    }
  })
  
  return (
    <View style={styles.circle}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View
          style={[styles.square, rStyle]}
        />
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    borderRadius: 20
  },
  circle: {
    height: CIRCLE_RADIUS * 2,
    width: CIRCLE_RADIUS * 2,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 255, 0.5)'
  }
});
