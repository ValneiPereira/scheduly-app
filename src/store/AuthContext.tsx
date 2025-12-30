import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { secureStorage } from '../services/secureStorage.service';

interface AuthState {
    accessToken: string | null;
    email: string | null;
    role: string | null;
    ownerId: string | null;
}

interface AuthContextType extends AuthState {
    setAuth: (data: {
        accessToken: string;
        refreshToken: string;
        email: string;
        role: string;
        ownerId: string;
    }) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        accessToken: null,
        email: null,
        role: null,
        ownerId: null,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Carregar dados do Keychain ao iniciar
    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const [accessToken, userData] = await Promise.all([
                secureStorage.getAccessToken(),
                secureStorage.getUserData(),
            ]);

            if (accessToken && userData) {
                setState({
                    accessToken,
                    email: userData.email,
                    role: userData.role,
                    ownerId: userData.ownerId,
                });
                console.log('[AuthContext] Auth restaurado do Keychain');
            }
        } catch (error) {
            console.error('[AuthContext] Erro ao carregar auth:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setAuth = async (data: {
        accessToken: string;
        refreshToken: string;
        email: string;
        role: string;
        ownerId: string;
    }) => {
        // Salva tokens e dados do usuário no Keychain
        await Promise.all([
            secureStorage.saveAccessToken(data.accessToken),
            secureStorage.saveRefreshToken(data.refreshToken),
            secureStorage.saveUserData({
                email: data.email,
                role: data.role,
                ownerId: data.ownerId,
            }),
        ]);

        // Atualiza o estado em memória
        setState({
            accessToken: data.accessToken,
            email: data.email,
            role: data.role,
            ownerId: data.ownerId,
        });

        console.log('[AuthContext] Auth salvo no Keychain');
    };

    const logout = async () => {
        // Limpa o Keychain
        await secureStorage.clearAll();

        // Limpa o estado
        setState({
            accessToken: null,
            email: null,
            role: null,
            ownerId: null,
        });

        console.log('[AuthContext] Logout realizado');
    };

    const value: AuthContextType = {
        ...state,
        setAuth,
        logout,
        isAuthenticated: !!state.accessToken,
        isLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
