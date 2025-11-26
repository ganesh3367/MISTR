import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import Card from '../components/Card';

export default function TimerScreen() {
    const [minutes, setMinutes] = useState(25);
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus');
    const intervalRef = useRef(null);

    useEffect(() => {
        setSecondsLeft(minutes * 60);
    }, [minutes]);

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        setIsActive(false);
                        Vibration.vibrate(500);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isActive]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(minutes * 60);
    };

    const setTimerMode = (newMode, mins) => {
        setMode(newMode);
        setMinutes(mins);
        setIsActive(false);
    };

    const progress = secondsLeft / (minutes * 60);
    const formatTime = (s) => {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Timer</Text>
            </View>

            <View style={styles.timerContainer}>
                <Text style={styles.timeText}>{formatTime(secondsLeft)}</Text>
                <Text style={styles.modeText}>{mode === 'focus' ? 'Focus' : 'Break'}</Text>
            </View>

            <View style={styles.controls}>
                <Button
                    title={isActive ? 'Pause' : 'Start'}
                    onPress={toggleTimer}
                    size="large"
                    style={styles.mainBtn}
                />
                <Button
                    title="Reset"
                    onPress={resetTimer}
                    variant="secondary"
                    size="large"
                    style={styles.mainBtn}
                />
            </View>

            <View style={styles.modeSelector}>
                <Button
                    title="Focus"
                    onPress={() => setTimerMode('focus', 25)}
                    variant={mode === 'focus' ? 'primary' : 'ghost'}
                    size="small"
                />
                <Button
                    title="Short Break"
                    onPress={() => setTimerMode('shortBreak', 5)}
                    variant={mode === 'shortBreak' ? 'primary' : 'ghost'}
                    size="small"
                />
                <Button
                    title="Long Break"
                    onPress={() => setTimerMode('longBreak', 15)}
                    variant={mode === 'longBreak' ? 'primary' : 'ghost'}
                    size="small"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.m,
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    timerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
        paddingVertical: theme.spacing.xl * 2,
    },
    timeText: {
        fontSize: 80,
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
    },
    modeText: {
        ...theme.typography.h3,
        color: theme.colors.textSecondary,
    },
    controls: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.l,
    },
    mainBtn: {
        flex: 1,
    },
    modeSelector: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.s,
        borderRadius: theme.borderRadius.l,
    },
});
