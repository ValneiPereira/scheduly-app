import { apiClient } from '../api/client';
import { ProfessionalResponse } from '../types/api';

export const professionalService = {
    list: async (serviceId?: number): Promise<ProfessionalResponse[]> => {
        const response = await apiClient.get<ProfessionalResponse[]>('/professionals', {
            params: { serviceId }
        });
        return response.data;
    },

    getById: async (id: number): Promise<ProfessionalResponse> => {
        const response = await apiClient.get<ProfessionalResponse>(`/professionals/${id}`);
        return response.data;
    },
};
