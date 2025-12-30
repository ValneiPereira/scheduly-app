import { useRouter, Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Alert
} from 'react-native';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { theme } from '../../../theme';
import { authService } from '../../../services/auth.service';
import { useAuth } from '../../../store/AuthContext';

export const LoginScreen = () => {
    console.log('[LoginScreen] Rendered');
    const router = useRouter();
    const { setAuth, isAuthenticated } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /* useEffect(() => {
        if (isAuthenticated) {
            console.log('[Auth] User already authenticated, redirecting...');
            router.replace('/home');
        }
    }, [isAuthenticated]); */

    const handleLogin = async () => {
        console.log('[Login] Attempting login for:', email);
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const data = await authService.login({ email, password });
            console.log('[Login] Success! Received tokens:', !!data.accessToken, !!data.refreshToken);

            // Persiste no AuthContext (que salva no Keychain)
            await setAuth({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
                email: data.email,
                role: data.role,
                ownerId: data.ownerId.toString(),
            });

            router.replace('/home');
        } catch (error: any) {
            console.error('[Login] Error:', error.response?.data || error.message);
            const status = error.response?.status;
            if (status === 401) {
                alert('E-mail ou senha inválidos.');
            } else {
                alert('Não foi possível falar com o servidor. Verifique se o backend está rodando.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoToRegister = () => {
        router.push('/register');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Tá Marcado!</Text>
                    <Text style={styles.subtitle}>Agende seu horário com os melhores profissionais.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="E-mail"
                        placeholder="seu@email.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Input
                        label="Senha"
                        placeholder="********"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Entrar"
                        onPress={handleLogin}
                        loading={loading}
                    />

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Não tem uma conta?</Text>
                        <Link href="/register" asChild>
                            <TouchableOpacity>
                                <Text style={styles.registerLink}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
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
    scrollContent: {
        flexGrow: 1,
        backgroundColor: theme.colors.background,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xl,
        gap: 4,
    },
    footerText: {
        color: theme.colors.textSecondary,
        fontSize: 16,
    },
    registerLink: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '600',
    }
});
