import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { theme } from '../../../theme';
import { authService } from '../../../services/auth.service';

export const RegisterScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        password: ''
    });

    const handleRegister = async () => {
        if (!form.name || !form.email || !form.cpf || !form.phone || !form.password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            await authService.register(form);
            alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
            router.back();
        } catch (error) {
            alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Tá Marcado!</Text>
                        <Text style={styles.subtitle}>Crie sua conta agora e comece a organizar sua agenda de forma elegante e inteligente.</Text>
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

                        <Input
                            label="Senha"
                            placeholder="Mínimo 6 caracteres"
                            secureTextEntry
                            value={form.password}
                            onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
                        />

                        <Button
                            title="Finalizar Cadastro"
                            onPress={handleRegister}
                            loading={loading}
                            style={styles.button}
                        />

                        <TouchableOpacity
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Text style={styles.backButtonText}>Já tem uma conta? Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.primary,
    },
    container: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    title: {
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h1.fontWeight as any,
        color: theme.colors.textDark,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.typography.subtitle.fontSize,
        color: theme.colors.textDark,
        opacity: 0.8,
        lineHeight: 22,
    },
    form: {
        flex: 1,
        padding: theme.spacing.lg,
        marginTop: theme.spacing.md,
    },
    button: {
        marginTop: theme.spacing.xl,
    },
    backButton: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    backButtonText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '600',
    }
});
