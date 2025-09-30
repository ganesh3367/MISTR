import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import Controls from 'my-app/control.js';
import TimerDisplay from './Timer_display';
// ...existing code...

export default function App() {
  return (
    <View style={styles.container}>
      <TimerDisplay />
      <Controls />
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
