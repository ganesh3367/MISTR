import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function Card({ children, style, variant = 'default' }) {
    return (
        <View style={[styles.card, variant === 'hover' && theme.shadows.hover, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        ...theme.shadows.default,
    },
});
