export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export interface BookingRequest {
    clientId: number;
    professionalId: number;
    serviceId: number;
    startAt: string; // ISO DateTime
    addressId?: number;
    notes?: string;
}

export interface BookingResponse {
    id: number;
    clientId: number;
    professionalId: number;
    serviceId: number;
    startAt: string;
    endAt: string;
    status: BookingStatus;
    addressId?: number;
    notes?: string;
    createdAt: string;
}
