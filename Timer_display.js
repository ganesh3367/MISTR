import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimerDisplay({ minutes, seconds, mode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.modeText}>
        {mode === 'study' ? 'Study Time' : 'Break Time'}
      </Text>
      {/* <Text style={styles.timerText}>
        {String(minutes).padStart(2, '0')}:
        {String(seconds).padStart(2, '0')}
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  modeText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
});
