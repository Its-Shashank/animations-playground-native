import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimationStarter from './animations/AnimationStarter';
import SimplePalmGesture from './animations/SimplePalmGesture';
import HorizontalSwipeGesture from './animations/HorizontalSwipeGesture';

export default function App() {
  return (
    <View style={styles.container}>
      <HorizontalSwipeGesture />
      {/* <StatusBar style="auto" /> */}
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
