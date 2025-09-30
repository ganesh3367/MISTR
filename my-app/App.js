import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import Controls from './control.js';
import TimerDisplay from './Timer_display';

export default function App() {
  const [mode, setMode] = useState('study');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const STUDY_MINUTES = 25;
  const BREAK_MINUTES = 5;

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        // seconds hit 0
        return 59;
      });
      setMinutes((prevMinutes) => {
        if (seconds > 0) return prevMinutes;
        if (prevMinutes > 0) return prevMinutes - 1;
        const nextMode = mode === 'study' ? 'break' : 'study';
        setMode(nextMode);
        return nextMode === 'study' ? STUDY_MINUTES : BREAK_MINUTES;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning, seconds, mode]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode('study');
    setMinutes(STUDY_MINUTES);
    setSeconds(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Study Timer</Text>
      </View>
      <TimerDisplay minutes={minutes} seconds={seconds} mode={mode} />
      <Controls onStart={handleStart} onPause={handlePause} onReset={handleReset} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
