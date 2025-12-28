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

export const LoginScreen = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert('Login realizado! (Simulação)');
        }, 1500);
    };

    const handleGoToRegister = () => {
        router.push('/register');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Marca aí</Text>
                        <Text style={styles.subtitle}>Bem-vindo(a)! Acesse sua conta para gerenciar seus agendamentos de forma simples.</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="E-mail"
                            placeholder="seu@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={form.email}
                            onChangeText={(text) => setForm(prev => ({ ...prev, email: text }))}
                        />

                        <Input
                            label="Senha"
                            placeholder="••••••••"
                            secureTextEntry
                            value={form.password}
                            onChangeText={(text) => setForm(prev => ({ ...prev, password: text }))}
                        />

                        <Button
                            title="Entrar"
                            onPress={handleLogin}
                            loading={loading}
                            style={styles.button}
                        />

                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Não tem uma conta?</Text>
                        <TouchableOpacity onPress={handleGoToRegister}>
                            <Text style={styles.linkText}>Cadastre-se</Text>
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
        fontSize: 32,
        fontWeight: '700',
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
        width: '100%',
        padding: theme.spacing.lg,
        marginTop: theme.spacing.md,
    },
    button: {
        marginTop: theme.spacing.md,
    },
    forgotPassword: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: theme.colors.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: theme.spacing.xl,
        gap: 4,
    },
    footerText: {
        color: theme.colors.textSecondary,
        fontSize: 16,
    },
    linkText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '600',
    }
});
