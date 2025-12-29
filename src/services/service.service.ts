import { apiClient } from '../api/client';
import { ServiceResponse } from '../types/api';

export const serviceService = {
    list: async (category?: string): Promise<ServiceResponse[]> => {
        const response = await apiClient.get<ServiceResponse[]>('/services', {
            params: { category }
        });
        return response.data;
    },

    getById: async (id: number): Promise<ServiceResponse> => {
        const response = await apiClient.get<ServiceResponse>(`/services/${id}`);
        return response.data;
    },
};
