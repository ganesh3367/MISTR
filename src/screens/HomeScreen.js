import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import Card from '../components/Card';
import Button from '../components/Button';

export default function HomeScreen({ onNavigate }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Good Morning,</Text>
                <Text style={styles.title}>Ready to focus?</Text>
            </View>

            <Card style={styles.heroCard}>
                <Text style={styles.heroTitle}>Daily Goal</Text>
                <Text style={styles.heroSubtitle}>You've completed 2 hours of study today. Keep it up!</Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '60%' }]} />
                </View>
                <Button
                    title="Continue Studying"
                    onPress={() => onNavigate('timer')}
                    style={styles.heroBtn}
                />
            </Card>

            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('planner')}>
                    <Card style={styles.actionCard}>
                        <Text style={styles.actionIcon}>📝</Text>
                        <Text style={styles.actionLabel}>Plan Tasks</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('stats')}>
                    <Card style={styles.actionCard}>
                        <Text style={styles.actionIcon}>📊</Text>
                        <Text style={styles.actionLabel}>View Stats</Text>
                    </Card>
                </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Recent Tasks</Text>
            <Card style={styles.taskCard}>
                <View style={styles.taskRow}>
                    <View style={styles.dot} />
                    <Text style={styles.taskText}>Complete Math Chapter 5</Text>
                </View>
                <View style={styles.taskRow}>
                    <View style={styles.dot} />
                    <Text style={styles.taskText}>Review Physics Notes</Text>
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.m,
    },
    header: {
        marginBottom: theme.spacing.l,
        marginTop: theme.spacing.m,
    },
    greeting: {
        ...theme.typography.h3,
        color: theme.colors.textSecondary,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    heroCard: {
        backgroundColor: theme.colors.primary,
        marginBottom: theme.spacing.xl,
    },
    heroTitle: {
        ...theme.typography.h2,
        color: '#FFFFFF',
    },
    heroSubtitle: {
        ...theme.typography.body,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: theme.spacing.s,
        marginBottom: theme.spacing.m,
    },
    progressBar: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 3,
        marginBottom: theme.spacing.l,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
    },
    heroBtn: {
        backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    grid: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.xl,
    },
    actionItem: {
        flex: 1,
    },
    actionCard: {
        alignItems: 'center',
        paddingVertical: theme.spacing.l,
    },
    actionIcon: {
        fontSize: 32,
        marginBottom: theme.spacing.s,
    },
    actionLabel: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text,
    },
    taskCard: {
        gap: theme.spacing.m,
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.s,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.secondary,
    },
    taskText: {
        ...theme.typography.body,
        color: theme.colors.text,
    },
});
