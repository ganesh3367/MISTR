import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Controls({ onStart, onPause, onReset }) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Start" onPress={onStart} color="#4CAF50" />
      </View>
      <View style={styles.button}>
        <Button title="Pause" onPress={onPause} color="#FF9800" />
      </View>
      <View style={styles.button}>
        <Button title="Reset" onPress={onReset} color="#F44336" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});
