import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { bookingService } from '../../../services/booking.service';
import { BookingResponse, BookingStatus } from '../../../types/booking';

export const HistoryScreen = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState<BookingResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            // Em um cenário real, o ID viria do Contexto de Auth
            const data = await bookingService.listByClient(1);
            setBookings(data);
        } catch (error) {
            console.error('Erro ao buscar históricos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const getStatusColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.CONFIRMED: return theme.colors.success;
            case BookingStatus.CANCELLED: return theme.colors.error;
            case BookingStatus.COMPLETED: return theme.colors.textSecondary;
            default: return theme.colors.primary;
        }
    };

    const renderBookingItem = ({ item }: { item: BookingResponse }) => (
        <View style={styles.bookingCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.dateText}>{new Date(item.startAt).toLocaleDateString('pt-BR')}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.infoRow}>
                    <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.infoText}>{new Date(item.startAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
                <Text style={styles.serviceName}>Serviço ID: {item.serviceId}</Text>
                <Text style={styles.profName}>Profissional ID: {item.professionalId}</Text>
            </View>

            {item.status === BookingStatus.CONFIRMED && (
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancel(item.id)}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const handleCancel = (id: number) => {
        Alert.alert(
            'Cancelar Agendamento',
            'Tem certeza que deseja cancelar este horário?',
            [
                { text: 'Não', style: 'cancel' },
                {
                    text: 'Sim, Cancelar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await bookingService.cancel(id);
                            fetchBookings();
                        } catch (error) {
                            Alert.alert('Erro', 'Não foi possível cancelar.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Agendamentos</Text>
                <TouchableOpacity onPress={fetchBookings}>
                    <Ionicons name="refresh" size={24} color={theme.colors.textDark} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 50 }} />
                ) : (
                    <FlatList
                        data={bookings}
                        renderItem={renderBookingItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Ionicons name="calendar-outline" size={64} color={theme.colors.surface} />
                                <Text style={styles.emptyText}>Você ainda não tem agendamentos.</Text>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.textDark,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    listContent: {
        padding: theme.spacing.lg,
    },
    bookingCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    dateText: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    cardContent: {
        marginBottom: theme.spacing.sm,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    infoText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
    serviceName: {
        color: theme.colors.text,
        fontSize: 15,
        fontWeight: '600',
    },
    profName: {
        color: theme.colors.textSecondary,
        fontSize: 13,
    },
    cancelButton: {
        marginTop: theme.spacing.sm,
        paddingVertical: 8,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    cancelButtonText: {
        color: theme.colors.error,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontSize: 16,
        marginTop: theme.spacing.md,
    }
});
