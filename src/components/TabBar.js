import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../constants/theme';

export default function TabBar({ activeTab, onTabChange }) {
    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'planner', label: 'Planner' },
        { id: 'timer', label: 'Timer' },
        { id: 'stats', label: 'Stats' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    style={styles.tab}
                    onPress={() => onTabChange(tab.id)}
                >
                    <Text
                        style={[
                            styles.label,
                            activeTab === tab.id && styles.activeLabel,
                        ]}
                    >
                        {tab.label}
                    </Text>
                    {activeTab === tab.id && <View style={styles.indicator} />}
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingBottom: 20, // For iPhone home indicator
        paddingTop: 10,
        ...theme.shadows.default,
        shadowOffset: { width: 0, height: -2 },
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
    activeLabel: {
        color: theme.colors.primary,
    },
    indicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.colors.primary,
        marginTop: 4,
    },
});
