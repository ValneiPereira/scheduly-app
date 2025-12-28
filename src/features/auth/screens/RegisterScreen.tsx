import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { theme } from '../../../theme';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export const RegisterScreen = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: ''
    });

    const handleRegister = () => {
        setLoading(true);
        // Simulação de chamada à API
        setTimeout(() => {
            setLoading(false);
            alert('Cadastro realizado com sucesso! (Teste)');
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Cadastrar Cliente</Text>
                        <Text style={styles.subtitle}>Crie uma nova conta para começar seus agendamentos.</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Nome Completo"
                            placeholder="Ex: Maria Silva"
                            value={form.name}
                            onChangeText={(text) => setForm(prev => ({ ...prev, name: text }))}
                        />

                        <Input
                            label="E-mail"
                            placeholder="email@exemplo.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={form.email}
                            onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
                        />

                        <Input
                            label="CPF"
                            placeholder="000.000.000-00"
                            keyboardType="numeric"
                            value={form.cpf}
                            onChangeText={(text) => setForm(prev => ({ ...prev, cpf: text }))}
                        />

                        <Input
                            label="Telefone"
                            placeholder="(00) 00000-0000"
                            keyboardType="phone-pad"
                            value={form.phone}
                            onChangeText={(text) => setForm(prev => ({ ...prev, phone: text }))}
                        />

                        <Button
                            title="Finalizar Cadastro"
                            onPress={handleRegister}
                            loading={loading}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        padding: theme.spacing.lg,
        flexGrow: 1,
    },
    header: {
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h1.fontWeight as any,
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.typography.subtitle.fontSize,
        color: theme.colors.textSecondary,
    },
    form: {
        flex: 1,
        marginTop: theme.spacing.md,
    },
    button: {
        marginTop: theme.spacing.xl,
    }
});
