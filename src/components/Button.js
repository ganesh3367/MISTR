import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export default function Button({ title, onPress, variant = 'primary', size = 'medium', style, textStyle }) {
    const getVariantStyle = () => {
        switch (variant) {
            case 'secondary':
                return styles.secondary;
            case 'ghost':
                return styles.ghost;
            case 'danger':
                return styles.danger;
            default:
                return styles.primary;
        }
    };

    const getSizeStyle = () => {
        switch (size) {
            case 'small':
                return styles.small;
            case 'large':
                return styles.large;
            default:
                return styles.medium;
        }
    };

    const getTextStyle = () => {
        if (variant === 'ghost') return { color: theme.colors.primary };
        return { color: '#FFFFFF' };
    };

    return (
        <TouchableOpacity
            style={[styles.base, getVariantStyle(), getSizeStyle(), style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: theme.borderRadius.s,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.secondary,
    },
    danger: {
        backgroundColor: theme.colors.danger,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    small: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    medium: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        width: '100%',
    },
    text: {
        fontWeight: '600',
        fontSize: 16,
    },
});
