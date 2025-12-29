import { apiClient } from '../api/client';
import { LoginRequest, AuthResponse, RegisterClientRequest } from '../types/auth';

export const authService = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', data);
        return response.data;
    },

    register: async (data: RegisterClientRequest): Promise<void> => {
        await apiClient.post('/auth/register', data);
    },
};
