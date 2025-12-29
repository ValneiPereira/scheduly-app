import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { theme } from '../../../theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ServiceCard } from '../components/ServiceCard';
import { ProfessionalItem } from '../components/ProfessionalItem';
import { serviceService } from '../../../services/service.service';
import { professionalService } from '../../../services/professional.service';
import { ServiceResponse, ProfessionalResponse } from '../../../types/api';

export const HomeScreen = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Serviço');
    const [services, setServices] = useState<ServiceResponse[]>([]);
    const [professionals, setProfessionals] = useState<ProfessionalResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        // ... (mantém fetchData igual)
        setLoading(true);
        try {
            const [servicesData, professionalsData] = await Promise.all([
                serviceService.list(),
                professionalService.list()
            ]);
            setServices(servicesData);
            setProfessionals(professionalsData);
        } catch (error) {
            console.error('Erro ao buscar dados da home:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleServicePress = (service: ServiceResponse) => {
        router.push({
            pathname: '/booking',
            params: {
                serviceId: service.id,
                serviceName: service.name
            }
        });
    };

    const handleProfessionalPress = (prof: ProfessionalResponse) => {
        router.push({
            pathname: '/booking',
            params: {
                professionalId: prof.id,
                professionalName: prof.name
            }
        });
    };

    // Imagens de fallback para serviços sem foto
    // ... (mantem getServiceImage)
    const getServiceImage = (serviceName: string) => {
        const name = serviceName.toLowerCase();
        if (name.includes('cabelo') || name.includes('corte'))
            return 'https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=120';
        if (name.includes('maquiagem'))
            return 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=120';
        if (name.includes('unha') || name.includes('manicure'))
            return 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=120';
        return 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=120';
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.headerSafeArea}>
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <TouchableOpacity>
                            <Ionicons name="chevron-back" size={24} color={theme.colors.textDark} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Tá Marcado!</Text>
                        <TouchableOpacity>
                            <Ionicons name="search" size={24} color={theme.colors.textDark} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/history')} style={{ marginLeft: 16 }}>
                            <Ionicons name="calendar" size={24} color={theme.colors.textDark} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tabsContainer}>
                        {['Serviço', 'Especialista', 'Promo'].map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[styles.tab, activeTab === tab && styles.activeTab]}
                                onPress={() => setActiveTab(tab)}
                            >
                                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </SafeAreaView>

            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Service</Text>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={services}
                    renderItem={({ item }) => (
                        <ServiceCard
                            title={item.name}
                            image={getServiceImage(item.name)}
                            onPress={() => handleServicePress(item)}
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    ListEmptyComponent={!loading ? <Text style={styles.emptyText}>Nenhum serviço disponível.</Text> : null}
                />

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Professional</Text>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                <View style={styles.professionalsList}>
                    {loading ? (
                        <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 20 }} />
                    ) : professionals.length > 0 ? (
                        professionals.map((prof) => (
                            <ProfessionalItem
                                key={prof.id}
                                id={prof.id}
                                name={prof.name}
                                rating={prof.rating}
                                onPress={() => handleProfessionalPress(prof)}
                            />
                        ))
                    ) : (
                        <Text style={styles.emptyText}>Nenhum profissional encontrado.</Text>
                    )}
                </View>

                <TouchableOpacity style={styles.ctaButton} activeOpacity={0.9}>
                    <Text style={styles.ctaButtonText}>Agendar Agora!</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerSafeArea: {
        backgroundColor: theme.colors.primary,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingBottom: theme.spacing.md,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.textDark,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        marginTop: theme.spacing.md,
        gap: 12,
    },
    tab: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    activeTab: {
        backgroundColor: theme.colors.secondary, // O azul marinho para o destaque da tab
    },
    tabText: {
        color: theme.colors.textDark,
        fontWeight: '600',
    },
    activeTabText: {
        color: theme.colors.text,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: theme.spacing.lg,
        paddingBottom: theme.spacing.xl * 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    horizontalList: {
        paddingBottom: theme.spacing.md,
    },
    professionalsList: {
        marginTop: theme.spacing.sm,
    },
    ctaButton: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    ctaButtonText: {
        color: theme.colors.textDark,
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        textAlign: 'center',
        marginVertical: theme.spacing.md,
    }
});
