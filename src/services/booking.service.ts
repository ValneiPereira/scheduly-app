import { apiClient } from '../api/client';
import { BookingRequest, BookingResponse } from '../types/booking';

export const bookingService = {
    create: async (data: BookingRequest): Promise<BookingResponse> => {
        const response = await apiClient.post<BookingResponse>('/api/bookings', data);
        return response.data;
    },

    listByClient: async (clientId: number): Promise<BookingResponse[]> => {
        const response = await apiClient.get<BookingResponse[]>('/api/bookings', {
            params: { clientId }
        });
        return response.data;
    },

    cancel: async (bookingId: number): Promise<void> => {
        await apiClient.delete(`/api/bookings/${bookingId}`);
    },
};
