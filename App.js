import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import Controls from './control.js';
import TimerDisplay from './Timer_display';

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
