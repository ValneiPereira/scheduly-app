import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { secureStorage } from '../services/secureStorage.service';
import { authService } from '../services/auth.service';

export const apiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Flag para evitar múltiplas chamadas simultâneas de refresh
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

// Interceptor para injetar o Token JWT automaticamente
apiClient.interceptors.request.use(async (config) => {
    const token = await secureStorage.getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

// Interceptor de resposta com refresh automático
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Se não for 401 ou já tentou refresh, rejeita
        if (error.response?.status !== 401 || originalRequest._retry) {
            console.error('[API Error]', error.response?.data || error.message);
            return Promise.reject(error);
        }

        // Se já está fazendo refresh, coloca na fila
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => {
                    return apiClient(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshToken = await secureStorage.getRefreshToken();

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            console.log('[API] Refreshing access token...');
            const response = await authService.refreshToken(refreshToken);

            // Salva o novo access token
            await secureStorage.saveAccessToken(response.accessToken);

            // Atualiza o header da requisição original
            originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

            processQueue(null);
            isRefreshing = false;

            // Retry da requisição original
            return apiClient(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);
            isRefreshing = false;

            // Se o refresh falhar, limpa tudo (logout)
            console.error('[API] Refresh token failed, logging out...');
            await secureStorage.clearAll();

            return Promise.reject(refreshError);
        }
    }
);
