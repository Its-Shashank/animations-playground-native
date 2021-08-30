import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');
const COLORS = ['#00B7EB', '#007FFF', '#4666FF', '#89CFF0'];

const SwipeableCard = ({ title, index }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      // context.translateY = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      // console.log('active', { event }, { context });
      console.log(event);
      translateY.value = event.translationY;
      // translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event) => {
      // console.log(event);
      if (event.y < 90) {
        translateY.value = withSpring(height);
        return;
      }
      if (event.y > 380) {
        translateY.value = withSpring(-height);
        return;
      }
      translateY.value = withSpring(0);
    },
  })

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        // {
        //   translateX: translateX.value,
        // },
        {
          translateY: translateY.value
        }
      ],
    }
  });
  
  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View style={[rStyle, styles.card, { backgroundColor: COLORS[index] }]}>
        <Text>{title}</Text>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 500,
    width: width - 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});

export default SwipeableCard;
