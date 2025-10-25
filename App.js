import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
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
  const [screen, setScreen] = useState('home');
  const [subjectName, setSubjectName] = useState('');
  const [subjectMinutes, setSubjectMinutes] = useState('30');
  const [subjects, setSubjects] = useState([]); 


  const [timerMinutes, setTimerMinutes] = useState('25');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);


  useEffect(() => {
    if (!running) {
      const m = Math.max(0, parseInt(timerMinutes || '0', 10));
      setSecondsLeft(m * 60);
    }
  }, [timerMinutes, running]);

  useEffect(() => {
    if (running) {
      if (intervalRef.current) return;
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

  const adjustSubjectMinutes = (id, delta) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, minutes: Math.max(0, (s.minutes || 0) + delta) } : s)));
  };

  const setSubjectMinutesDirect = (id, value) => {
    const mm = Math.max(0, parseInt(value || '0', 10) || 0);
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, minutes: mm } : s)));
  };

  const clearSubjects = () => {
    setSubjects([]);
  };

  const quickStart = (mins) => {
    const mm = Math.max(0, mins || 0);
    setTimerMinutes(String(mm));
    if (!running) setSecondsLeft(mm * 60);
    setScreen('timer');
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


  const setPresetMinutes = (m) => {
    const mm = Math.max(0, parseInt(String(m) || '0', 10));
    setTimerMinutes(String(mm));
    if (!running) setSecondsLeft(mm * 60);
  };

  const adjustMinutes = (delta) => {
    const current = Math.max(0, parseInt(timerMinutes || '0', 10));
    const mm = Math.max(0, current + delta);
    setTimerMinutes(String(mm));
    if (!running) setSecondsLeft(mm * 60);
  };

  const progress = (() => {
    const total = Math.max(1, parseInt(timerMinutes || '0', 10) * 60);
    return Math.min(1, Math.max(0, 1 - secondsLeft / total));
  })();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Study Time</Text>
        <Text style={styles.appBarSub}>Focus • Plan • Track</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: 100, flexGrow: 1 }]}>

          {screen === 'home' && (
            <View>
              <View style={[styles.card, styles.heroCard]}>
                <Text style={styles.heroTitle}>Welcome back</Text>
                <Text style={styles.heroSubtitle}>Plan your study and stay focused with a simple flow.</Text>
                <View style={styles.ctaRow}>
                  <TouchableOpacity style={[styles.btn, styles.btnPrimary, styles.ctaBtn]} onPress={() => setScreen('planner')}>
                    <Text style={[styles.btnText, styles.ctaText]}>Plan Subjects</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.btn, styles.btnSecondary, styles.ctaBtn]} onPress={() => setScreen('timer')}>
                    <Text style={[styles.btnText, styles.ctaText]}>Start Timer</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.statRow}>
                <View style={[styles.statCard, styles.cardShadow]}>
                  <Text style={styles.statValue}>{totalPlanned}</Text>
                  <Text style={styles.statLabel}>Planned minutes</Text>
                </View>
                <View style={[styles.statCard, styles.cardShadow]}>
                  <Text style={styles.statValue}>{subjects.length}</Text>
                  <Text style={styles.statLabel}>Subjects</Text>
                </View>
              </View>

              <View style={[styles.card, styles.featureCard]}>
                <Text style={styles.featureTitle}>Quick tips</Text>
                <Text style={styles.featureDesc}>
                  Use presets on the Timer for quick sessions and keep your planner focused on the top 3 subjects.
                </Text>
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
              <Text style={styles.help}>Plan how many minutes you want to study for each subject today.</Text>
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
                      <View style={{ flex: 1 }}>
                        <Text style={styles.subjectText}>{s.name}</Text>
                      </View>
                      <View style={styles.subjectControls}>
                        <TouchableOpacity style={styles.minsBtn} onPress={() => adjustSubjectMinutes(s.id, -5)}>
                          <Text style={styles.minsBtnText}>−5</Text>
                        </TouchableOpacity>
                        <TextInput
                          style={[styles.input, styles.minsInput]}
                          value={String(s.minutes || 0)}
                          onChangeText={(v) => setSubjectMinutesDirect(s.id, v)}
                          keyboardType="number-pad"
                          maxLength={4}
                        />
                        <TouchableOpacity style={styles.minsBtn} onPress={() => adjustSubjectMinutes(s.id, 5)}>
                          <Text style={styles.minsBtnText}>+5</Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.subjectActions}>
                        <TouchableOpacity style={[styles.btn, styles.startBtn]} onPress={() => quickStart(s.minutes)}>
                          <Text style={styles.btnText}>Start</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteBtn} onPress={() => removeSubject(s.id)}>
                          <Text style={styles.deleteText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total Planned:</Text>
                <Text style={styles.totalValue}>{totalPlanned} min</Text>
              </View>
              {subjects.length > 0 && (
                <View style={{ marginTop: 12 }}>
                  <TouchableOpacity style={[styles.btn, styles.btnSecondary, styles.btnLarge]} onPress={clearSubjects}>
                    <Text style={[styles.btnText, styles.btnTextLarge]}>Clear All</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}

          {screen === 'timer' && (
            <View style={[styles.card, styles.focusCard]}>
              <Text style={styles.sectionTitle}>Simple Timer</Text>
              <Text style={styles.help}>Set minutes and start the timer.</Text>

              <View style={[styles.row, { justifyContent: 'space-between' }]}>
                <TouchableOpacity style={[styles.chip]} onPress={() => adjustMinutes(-5)}>
                  <Text style={styles.chipText}>−5</Text>
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  value={timerMinutes}
                  onChangeText={setTimerMinutes}
                  placeholder="mins"
                  keyboardType="number-pad"
                  maxLength={4}
                />
                <TouchableOpacity style={[styles.chip]} onPress={() => adjustMinutes(5)}>
                  <Text style={styles.chipText}>+5</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.row, { justifyContent: 'space-between', marginTop: 10 }]}>
                <TouchableOpacity style={styles.presetBtn} onPress={() => setPresetMinutes(5)}>
                  <Text style={styles.presetText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn} onPress={() => setPresetMinutes(15)}>
                  <Text style={styles.presetText}>15</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn} onPress={() => setPresetMinutes(25)}>
                  <Text style={styles.presetText}>25</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.presetBtn} onPress={() => setPresetMinutes(50)}>
                  <Text style={styles.presetText}>50</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.timeDisplay}>
                <Text style={styles.time}>{formatTime(secondsLeft)}</Text>
              </View>

              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>

              <View style={styles.controls}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnLarge, styles.controlBtn, running ? styles.btnPause : styles.btnPrimary]}
                  onPress={() => setRunning((r) => !r)}
                >
                  <Text style={[styles.btnText, styles.btnTextLarge]}>{running ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnLarge, styles.controlBtn, styles.btnSecondary]} onPress={onReset}>
                  <Text style={[styles.btnText, styles.btnTextLarge]}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setScreen('home')}>
          <Text style={[styles.tabLabel, screen === 'home' && styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setScreen('planner')}>
          <Text style={[styles.tabLabel, screen === 'planner' && styles.tabLabelActive]}>Planner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setScreen('timer')}>
          <Text style={[styles.tabLabel, screen === 'timer' && styles.tabLabelActive]}>Timer</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'stretch',
    gap: 16,
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
  appBar: {
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7ECF6',
    backgroundColor: '#F6F7FB',
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2A44',
  },
  appBarSub: {
    color: '#5A6A85',
    marginTop: 2,
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
  timeDisplay: {
    marginTop: 24,
    alignSelf: 'center',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7ECF6',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  controls: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  controlBtn: {
    flex: 1,
  },
  menuCard: {
    alignItems: 'stretch',
  },
  menuBtn: {
    alignItems: 'center',
  },
  featureCard: {
    gap: 14,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  heroCard: {
    backgroundColor: '#EEF3FF',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2A44',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#5A6A85',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  ctaBtn: {
    flex: 1,
    paddingVertical: 16,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
  },
  statRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E7ECF6',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2A44',
  },
  statLabel: {
    marginTop: 4,
    color: '#5A6A85',
    fontWeight: '600',
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
  chip: {
    backgroundColor: '#E7ECF6',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  chipText: {
    color: '#1F2A44',
    fontWeight: '700',
    fontSize: 16,
  },
  presetBtn: {
    backgroundColor: '#FAFBFE',
    borderWidth: 1,
    borderColor: '#D7DDE8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  presetText: {
    color: '#1F2A44',
    fontWeight: '700',
  },
  progressTrack: {
    marginTop: 14,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E7ECF6',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E5BFF',
  },
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E7ECF6',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabLabel: {
    color: '#5A6A85',
    fontWeight: '700',
  },
  tabLabelActive: {
    color: '#2E5BFF',
  },
});
