import { apiClient } from '../api/client';
import { LoginRequest, AuthResponse, RegisterClientRequest, RefreshTokenResponse } from '../types/auth';

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (data: RegisterClientRequest): Promise<void> => {
        await apiClient.post('/auth/register', data);
    },

    refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
        const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
            refreshToken,
        });
        return response.data;
    },
};
