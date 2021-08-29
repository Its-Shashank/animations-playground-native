import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from 'react-native-reanimated';

export default function AnimationStarter() {

  const progress = useSharedValue(1);
  const radius = useSharedValue(0);
  // gives us an initial value for animation, I think an alternative to Animated.value() from react native.
  // it gives a value that could be handled from the UI thread.
  // NOTE:- typeof value in useSharedValue could be anything ('string', bool, object)
  const SIZE = 100.0;

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: radius.value,
      transform: [{ scale: progress.value }]
    }
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), 5, true);
    radius.value = withRepeat(withSpring(50), 5, true);
  }, []);


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          { height: SIZE, width: SIZE, backgroundColor: 'blue' },
          reanimatedStyle
        ]} />
      <Text>Hello</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
