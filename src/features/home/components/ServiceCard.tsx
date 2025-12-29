import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';

interface ServiceCardProps {
    title: string;
    image?: string;
    onPress?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, image, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
            <View style={styles.imagePlaceholder}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.emptyImage} />
                )}
            </View>
            <View style={styles.footer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 160,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        marginRight: theme.spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    imagePlaceholder: {
        flex: 1,
        backgroundColor: '#E2E8F0',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emptyImage: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
    footer: {
        padding: theme.spacing.sm,
        backgroundColor: '#1E3A8A', // Um azul levemente diferente para o pé do card
        alignItems: 'center',
    },
    title: {
        color: theme.colors.text,
        fontSize: 12,
        fontWeight: '600',
    }
});
