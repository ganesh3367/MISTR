import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabBar({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'planner', icon: 'calendar', label: 'Planner' },
        { id: 'timer', icon: 'timer', label: 'Timer' },
        { id: 'stats', icon: 'bar-chart', label: 'Stats' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <TouchableOpacity
                        key={tab.id}
                        style={styles.tab}
                        onPress={() => onTabChange(tab.id)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                            <Ionicons
                                name={isActive ? tab.icon : `${tab.icon}-outline`}
                                size={24}
                                color={isActive ? theme.colors.primary : theme.colors.textSecondary}
                            />
                        </View>
                        <Text
                            style={[
                                styles.label,
                                isActive && styles.activeLabel,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingBottom: Platform.OS === 'ios' ? 20 : 12,
        paddingTop: 12,
        ...theme.shadows.default,
        shadowOffset: { width: 0, height: -4 },
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        padding: 4,
        borderRadius: 12,
        marginBottom: 2,
    },
    activeIconContainer: {
        backgroundColor: '#EEF2FF', // Very light indigo
    },
    label: {
        fontSize: 10,
        fontWeight: '500',
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    activeLabel: {
        color: theme.colors.primary,
        fontWeight: '700',
    },
});
