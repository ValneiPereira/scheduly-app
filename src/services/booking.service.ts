import { apiClient } from '../api/client';
import { BookingRequest, BookingResponse } from '../types/booking';

export const bookingService = {
    create: async (data: BookingRequest): Promise<BookingResponse> => {
        const response = await apiClient.post<BookingResponse>('/bookings', data);
        return response.data;
    },

    listByClient: async (clientId: number): Promise<BookingResponse[]> => {
        const response = await apiClient.get<BookingResponse[]>('/bookings', {
            params: { clientId }
        });
        return response.data;
    },

    cancel: async (bookingId: number): Promise<void> => {
        await apiClient.delete(`/bookings/${bookingId}`);
    },
};
