import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../../components/Button';
import { bookingService } from '../../../services/booking.service';

export const BookingScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { serviceId, serviceName, professionalId, professionalName } = params;

    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const dates = [
        { day: 'Seg', date: '25', full: '2025-12-25' },
        { day: 'Ter', date: '26', full: '2025-12-26' },
        { day: 'Qua', date: '27', full: '2025-12-27' },
        { day: 'Qui', date: '28', full: '2025-12-28' },
        { day: 'Sex', date: '29', full: '2025-12-29' },
    ];

    const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

    const handleConfirmBooking = async () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Atenção', 'Por favor, selecione uma data e um horário.');
            return;
        }

        setLoading(true);
        try {
            // No mundo real, precisaríamos do clientId do estado global/auth context
            const bookingData = {
                clientId: 1, // Mock para teste, deve vir do auth
                professionalId: Number(professionalId),
                serviceId: Number(serviceId),
                startAt: `${selectedDate}T${selectedTime}:00`,
                notes: 'Agendamento via App Tá Marcado!'
            };

            await bookingService.create(bookingData);
            Alert.alert('Sucesso!', 'Seu agendamento foi realizado com sucesso.', [
                { text: 'OK', onPress: () => router.replace('/home') }
            ]);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível realizar o agendamento. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Agendar Horário</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Serviço:</Text>
                    <Text style={styles.summaryValue}>{serviceName}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.summaryLabel}>Profissional:</Text>
                    <Text style={styles.summaryValue}>{professionalName}</Text>
                </View>

                <Text style={styles.sectionTitle}>Selecione a Data</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateList}>
                    {dates.map((item) => (
                        <TouchableOpacity
                            key={item.full}
                            style={[styles.dateCard, selectedDate === item.full && styles.selectedCard]}
                            onPress={() => setSelectedDate(item.full)}
                        >
                            <Text style={[styles.dateDay, selectedDate === item.full && styles.selectedText]}>{item.day}</Text>
                            <Text style={[styles.dateNumber, selectedDate === item.full && styles.selectedText]}>{item.date}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Horários Disponíveis</Text>
                <View style={styles.timeGrid}>
                    {times.map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[styles.timeCard, selectedTime === time && styles.selectedCard]}
                            onPress={() => setSelectedTime(time)}
                        >
                            <Text style={[styles.timeText, selectedTime === time && styles.selectedText]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Button
                    title="Confirmar Agendamento"
                    onPress={handleConfirmBooking}
                    loading={loading}
                    style={styles.confirmButton}
                />
            </ScrollView>
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
    content: {
        padding: theme.spacing.lg,
    },
    summaryCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    summaryLabel: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        marginBottom: 4,
    },
    summaryValue: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginVertical: theme.spacing.md,
    },
    sectionTitle: {
        color: theme.colors.text,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: theme.spacing.md,
    },
    dateList: {
        marginBottom: theme.spacing.xl,
    },
    dateCard: {
        width: 70,
        height: 80,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    selectedCard: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    dateDay: {
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
    dateNumber: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    selectedText: {
        color: theme.colors.textDark,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: theme.spacing.xl,
    },
    timeCard: {
        width: '30%',
        paddingVertical: 12,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    timeText: {
        color: theme.colors.text,
        fontWeight: '600',
    },
    confirmButton: {
        marginTop: theme.spacing.md,
    }
});
