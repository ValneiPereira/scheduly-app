import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';

interface ProfessionalItemProps {
    id: number;
    name: string;
    rating: number;
    onPress?: () => void;
}

export const ProfessionalItem: React.FC<ProfessionalItemProps> = ({ id, name, rating, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
            <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{id}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{name}</Text>
                <View style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                            key={star}
                            name={star <= Math.floor(rating) ? "star" : "star-outline"}
                            size={16}
                            color={theme.colors.star}
                        />
                    ))}
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    rankBadge: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    rankText: {
        color: theme.colors.textDark,
        fontWeight: 'bold',
        fontSize: 18,
    },
    info: {
        flex: 1,
    },
    name: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
    }
});
