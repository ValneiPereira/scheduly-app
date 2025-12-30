import * as Keychain from 'react-native-keychain';

/**
 * Serviço de armazenamento seguro usando Keychain (iOS) e Keystore (Android)
 * Substitui AsyncStorage para dados sensíveis como tokens
 */

const KEYS = {
    ACCESS_TOKEN: 'access_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
} as const;

export interface UserData {
    email: string;
    role: string;
    ownerId: string;
}

/**
 * Salva o access token de forma segura
 */
export const saveAccessToken = async (token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword(KEYS.ACCESS_TOKEN, token, {
            service: KEYS.ACCESS_TOKEN,
        });
    } catch (error) {
        console.error('[SecureStorage] Erro ao salvar access token:', error);
        throw error;
    }
};

/**
 * Recupera o access token
 */
export const getAccessToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: KEYS.ACCESS_TOKEN,
        });
        return credentials ? credentials.password : null;
    } catch (error) {
        console.error('[SecureStorage] Erro ao recuperar access token:', error);
        return null;
    }
};

/**
 * Salva o refresh token de forma segura
 */
export const saveRefreshToken = async (token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword(KEYS.REFRESH_TOKEN, token, {
            service: KEYS.REFRESH_TOKEN,
        });
    } catch (error) {
        console.error('[SecureStorage] Erro ao salvar refresh token:', error);
        throw error;
    }
};

/**
 * Recupera o refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: KEYS.REFRESH_TOKEN,
        });
        return credentials ? credentials.password : null;
    } catch (error) {
        console.error('[SecureStorage] Erro ao recuperar refresh token:', error);
        return null;
    }
};

/**
 * Salva dados do usuário de forma segura
 */
export const saveUserData = async (userData: UserData): Promise<void> => {
    try {
        await Keychain.setGenericPassword(
            KEYS.USER_DATA,
            JSON.stringify(userData),
            {
                service: KEYS.USER_DATA,
            }
        );
    } catch (error) {
        console.error('[SecureStorage] Erro ao salvar dados do usuário:', error);
        throw error;
    }
};

/**
 * Recupera dados do usuário
 */
export const getUserData = async (): Promise<UserData | null> => {
    try {
        const credentials = await Keychain.getGenericPassword({
            service: KEYS.USER_DATA,
        });
        if (credentials) {
            return JSON.parse(credentials.password);
        }
        return null;
    } catch (error) {
        console.error('[SecureStorage] Erro ao recuperar dados do usuário:', error);
        return null;
    }
};

/**
 * Remove todos os dados armazenados (usado no logout)
 */
export const clearAll = async (): Promise<void> => {
    try {
        await Promise.all([
            Keychain.resetGenericPassword({ service: KEYS.ACCESS_TOKEN }),
            Keychain.resetGenericPassword({ service: KEYS.REFRESH_TOKEN }),
            Keychain.resetGenericPassword({ service: KEYS.USER_DATA }),
        ]);
        console.log('[SecureStorage] Todos os dados foram removidos');
    } catch (error) {
        console.error('[SecureStorage] Erro ao limpar dados:', error);
        throw error;
    }
};

export const secureStorage = {
    saveAccessToken,
    getAccessToken,
    saveRefreshToken,
    getRefreshToken,
    saveUserData,
    getUserData,
    clearAll,
};
