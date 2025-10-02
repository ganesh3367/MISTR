import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Vibration,
} from 'react-native';

export default function App() {
  // Simple navigation: 'home' | 'planner' | 'timer'
  const [screen, setScreen] = useState('home');
  // Subject planner state
  const [subjectName, setSubjectName] = useState('');
  const [subjectMinutes, setSubjectMinutes] = useState('30');
  const [subjects, setSubjects] = useState([]); // [{id, name, minutes}]

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState('25');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Keep secondsLeft in sync when user changes minutes and timer not running
  useEffect(() => {
    if (!running) {
      const m = Math.max(0, parseInt(timerMinutes || '0', 10));
      setSecondsLeft(m * 60);
    }
  }, [timerMinutes, running]);

  useEffect(() => {
    if (running) {
      if (intervalRef.current) return; // already running
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setRunning(false);
            Vibration.vibrate(500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running]);

  const addSubject = () => {
    const name = subjectName.trim();
    const mins = Math.max(0, parseInt(subjectMinutes || '0', 10));
    if (!name || mins <= 0) return;
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setSubjects((prev) => [...prev, { id, name, minutes: mins }]);
    setSubjectName('');
    setSubjectMinutes('30');
  };

  const removeSubject = (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const totalPlanned = subjects.reduce((sum, s) => sum + (s.minutes || 0), 0);

  const formatTime = (s) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const ss = Math.floor(s % 60)
      .toString()
      .padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const onReset = () => {
    setRunning(false);
    const m = Math.max(0, parseInt(timerMinutes || '0', 10));
    setSecondsLeft(m * 60);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Study Time</Text>
            <Text style={styles.subtitle}>• Simple and neat</Text>
            <View style={styles.divider} />
          </View>

          {screen === 'home' && (
            <View style={{ width: '100%' }}>
              <View style={[styles.card, styles.featureCard]}>
                <Text style={styles.featureTitle}>Subject Planner</Text>
                <Text style={styles.featureDesc}>
                  Plan your day by assigning minutes to each subject. Keep it simple and focused.
                </Text>
                <TouchableOpacity style={[styles.btn, styles.btnPrimary, styles.btnLarge]} onPress={() => setScreen('planner')}>
                  <Text style={[styles.btnText, styles.btnTextLarge]}>Open Planner</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.card, styles.featureCard]}>
                <Text style={styles.featureTitle}>Simple Timer</Text>
                <Text style={styles.featureDesc}>
                  A clean countdown timer. Set minutes, start, pause, and reset when needed.
                </Text>
                <TouchableOpacity style={[styles.btn, styles.btnSecondary, styles.btnLarge]} onPress={() => setScreen('timer')}>
                  <Text style={[styles.btnText, styles.btnTextLarge]}>Open Timer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {screen !== 'home' && (
            <View style={{ marginBottom: 8 }}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setScreen('home')}>
                <Text style={styles.backBtnText}>← Back</Text>
              </TouchableOpacity>
            </View>
          )}

          {screen === 'planner' && (
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Subject Planner</Text>
              <Text style={styles.help}>
                Plan how many minutes you want to study for each subject today.
              </Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={subjectName}
                  onChangeText={setSubjectName}
                  placeholder="Subject (e.g., Math)"
                />
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  value={subjectMinutes}
                  onChangeText={setSubjectMinutes}
                  placeholder="mins"
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <TouchableOpacity style={styles.btn} onPress={addSubject}>
                  <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
              </View>

              {subjects.length === 0 ? (
                <Text style={styles.empty}>No subjects added yet.</Text>
              ) : (
                <View style={{ marginTop: 8 }}>
                  {subjects.map((s) => (
                    <View key={s.id} style={styles.subjectItem}>
                      <Text style={styles.subjectText}>
                        {s.name} — {s.minutes} min
                      </Text>
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => removeSubject(s.id)}
                      >
                        <Text style={styles.deleteText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total Planned:</Text>
                <Text style={styles.totalValue}>{totalPlanned} min</Text>
              </View>
            </View>
          )}

          {screen === 'timer' && (
            <View style={[styles.card, styles.focusCard]}>
              <Text style={styles.sectionTitle}>Simple Timer</Text>
              <Text style={styles.help}>Set minutes and start the timer.</Text>

              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  value={timerMinutes}
                  onChangeText={setTimerMinutes}
                  placeholder="mins"
                  keyboardType="number-pad"
                  maxLength={4}
                />
              </View>

              <View style={styles.timerCircle}>
                <Text style={styles.time}>{formatTime(secondsLeft)}</Text>
              </View>

              <View style={styles.controls}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnLarge, running ? styles.btnPause : styles.btnPrimary]}
                  onPress={() => setRunning((r) => !r)}
                >
                  <Text style={[styles.btnText, styles.btnTextLarge]}>{running ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnLarge, styles.btnSecondary]} onPress={onReset}>
                  <Text style={[styles.btnText, styles.btnTextLarge]}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1F2A44',
  },
  subtitle: {
    marginTop: 6,
    color: '#5A6A85',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#E7ECF6',
    marginTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    width: '100%',
  },
  focusCard: {
    borderWidth: 1,
    borderColor: '#E7ECF6',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2A44',
  },
  help: {
    marginTop: 4,
    color: '#5A6A85',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D7DDE8',
    backgroundColor: '#FAFBFE',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    color: '#1F2A44',
  },
  inputSmall: {
    width: 90,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#2E5BFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnLarge: {
    paddingVertical: 18,
    width: '100%',
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
  },
  btnTextLarge: {
    fontSize: 18,
  },
  btnPrimary: {
    backgroundColor: '#2E5BFF',
  },
  btnSecondary: {
    backgroundColor: '#6C7A91',
  },
  btnPause: {
    backgroundColor: '#FF8A00',
  },
  empty: {
    marginTop: 12,
    color: '#6C7A91',
    fontStyle: 'italic',
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2FA',
  },
  subjectText: {
    color: '#1F2A44',
    fontWeight: '600',
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#F05D5E',
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalText: {
    color: '#5A6A85',
    fontWeight: '600',
  },
  totalValue: {
    color: '#1F2A44',
    fontWeight: '700',
  },
  time: {
    fontSize: 48,
    textAlign: 'center',
    fontWeight: '800',
    color: '#1F2A44',
  },
  timerCircle: {
    marginTop: 24,
    alignSelf: 'center',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 8,
    borderColor: '#E7ECF6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  controls: {
    marginLeft: 90,
    width: 160,
    gap:10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  menuCard: {
    alignItems: 'stretch',
  },
  menuBtn: {
    alignItems: 'center',
  },
  featureCard: {
    gap: 14,
    minHeight: 200,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2A44',
    fontFamily:'lucidasans'
  },
  featureDesc: {
    color: '#5A6A85',
    fontSize: 16,
    lineHeight: 22,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7ECF6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backBtnText: {
    color: '#1F2A44',
    fontWeight: '600',
  },
});
