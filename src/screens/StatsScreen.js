import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../constants/theme';
import Card from '../components/Card';

export default function StatsScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Statistics</Text>
                <Text style={styles.subtitle}>Track your progress</Text>
            </View>

            <View style={styles.grid}>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>4.5h</Text>
                    <Text style={styles.statLabel}>Total Study Time</Text>
                </Card>
                <Card style={styles.statCard}>
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Sessions Completed</Text>
                </Card>
            </View>

            <Card style={styles.chartCard}>
                <Text style={styles.cardTitle}>Weekly Activity</Text>
                <View style={styles.chartPlaceholder}>
                    <View style={[styles.bar, { height: '40%' }]} />
                    <View style={[styles.bar, { height: '70%' }]} />
                    <View style={[styles.bar, { height: '50%' }]} />
                    <View style={[styles.bar, { height: '90%' }]} />
                    <View style={[styles.bar, { height: '60%' }]} />
                    <View style={[styles.bar, { height: '30%' }]} />
                    <View style={[styles.bar, { height: '80%' }]} />
                </View>
                <View style={styles.days}>
                    <Text style={styles.dayText}>M</Text>
                    <Text style={styles.dayText}>T</Text>
                    <Text style={styles.dayText}>W</Text>
                    <Text style={styles.dayText}>T</Text>
                    <Text style={styles.dayText}>F</Text>
                    <Text style={styles.dayText}>S</Text>
                    <Text style={styles.dayText}>S</Text>
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
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    grid: {
        flexDirection: 'row',
        gap: theme.spacing.m,
        marginBottom: theme.spacing.m,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing.l,
    },
    statValue: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.primary,
    },
    statLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    chartCard: {
        padding: theme.spacing.l,
    },
    cardTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    chartPlaceholder: {
        height: 150,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing.s,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    bar: {
        width: 30,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.s,
        opacity: 0.8,
    },
    days: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.s,
    },
    dayText: {
        width: 30,
        textAlign: 'center',
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
});
