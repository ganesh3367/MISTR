import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../constants/theme';
import Card from '../components/Card';
import Button from '../components/Button';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ onNavigate }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>{getGreeting()},</Text>
                    <Text style={styles.title}>Ready to focus?</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-circle-outline" size={40} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <Card style={styles.heroCard}>
                <View style={styles.heroContent}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroTitle}>Daily Goal</Text>
                        <Text style={styles.heroSubtitle}>2h 30m / 4h goal</Text>
                    </View>
                    <View style={styles.heroIcon}>
                        <Ionicons name="trophy" size={32} color="#FFD700" />
                    </View>
                </View>

                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '62%' }]} />
                    </View>
                    <Text style={styles.progressText}>62%</Text>
                </View>

                <Text style={styles.motivationText}>You're doing great! Keep the momentum going.</Text>

                <Button
                    title="Start Session"
                    onPress={() => onNavigate('timer')}
                    style={styles.heroBtn}
                    textStyle={styles.heroBtnText}
                />
            </Card>

            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('planner')}>
                    <Card style={styles.actionCard}>
                        <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
                            <Ionicons name="calendar" size={24} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.actionLabel}>Plan Tasks</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} onPress={() => onNavigate('stats')}>
                    <Card style={styles.actionCard}>
                        <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
                            <Ionicons name="bar-chart" size={24} color={theme.colors.success} />
                        </View>
                        <Text style={styles.actionLabel}>View Stats</Text>
                    </Card>
                </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Tasks</Text>
                <TouchableOpacity onPress={() => onNavigate('planner')}>
                    <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
            </View>

            <Card style={styles.taskCard}>
                <View style={styles.taskRow}>
                    <View style={[styles.checkbox, { borderColor: theme.colors.success }]}>
                        <Ionicons name="checkmark" size={14} color={theme.colors.success} />
                    </View>
                    <Text style={[styles.taskText, styles.completedTask]}>Complete Math Chapter 5</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.taskRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.taskText}>Review Physics Notes</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.taskRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.taskText}>Prepare for History Quiz</Text>
                </View>
            </Card>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.m,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
        marginTop: theme.spacing.s,
    },
    greeting: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    profileButton: {
        padding: 4,
    },
    heroCard: {
        backgroundColor: theme.colors.primary,
        marginBottom: theme.spacing.xl,
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.xl,
        ...theme.shadows.hover,
        shadowColor: theme.colors.primary,
    },
    heroContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.m,
    },
    heroTextContainer: {
        flex: 1,
    },
    heroTitle: {
        ...theme.typography.h3,
        color: '#FFFFFF',
        marginBottom: 4,
    },
    heroSubtitle: {
        ...theme.typography.body,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    heroIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 8,
        borderRadius: 12,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        gap: theme.spacing.s,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
    },
    progressText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
    },
    motivationText: {
        ...theme.typography.caption,
        color: 'rgba(255, 255, 255, 0.9)',
        marginBottom: theme.spacing.l,
    },
    heroBtn: {
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.m,
        paddingVertical: 12,
    },
    heroBtnText: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
    seeAll: {
        ...theme.typography.body,
        color: theme.colors.primary,
        fontWeight: '600',
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
        borderRadius: theme.borderRadius.l,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.s,
    },
    actionLabel: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text,
    },
    taskCard: {
        padding: 0,
        overflow: 'hidden',
    },
    taskRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        gap: theme.spacing.m,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskText: {
        ...theme.typography.body,
        color: theme.colors.text,
        flex: 1,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: theme.colors.textSecondary,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginLeft: theme.spacing.m + 24 + theme.spacing.m, // Align with text
    },
});
