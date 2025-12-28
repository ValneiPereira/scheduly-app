import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { theme } from '../../../theme';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

export const LoginScreen = () => {
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Bem-vinda!</Text>
                        <Text style={styles.subtitle}>Acesse sua conta para gerenciar seus agendamentos.</Text>
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
                        <TouchableOpacity>
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
        backgroundColor: theme.colors.background,
    },
    container: {
        padding: theme.spacing.lg,
        flexGrow: 1,
        justifyContent: 'center',
    },
    header: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: theme.colors.primary,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: theme.typography.subtitle.fontSize,
        color: theme.colors.textSecondary,
        lineHeight: 22,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing.md,
    },
    forgotPassword: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    forgotPasswordText: {
        color: theme.colors.textSecondary,
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: theme.spacing.xl,
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
