import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from 'react-native';
import { theme } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
    variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
    title,
    loading,
    variant = 'primary',
    style,
    ...props
}) => {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[
                styles.container,
                isPrimary ? styles.primary : styles.secondary,
                style
            ]}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color={isPrimary ? theme.colors.textDark : theme.colors.primary} />
            ) : (
                <Text style={[styles.text, !isPrimary && styles.secondaryText]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 56,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    text: {
        color: theme.colors.textDark,
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.button.fontWeight as any,
    },
    secondaryText: {
        color: theme.colors.primary,
    }
});
