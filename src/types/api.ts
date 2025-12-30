export interface AddressResponse {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface ServiceResponse {
    id: number;
    name: string;
    description: string;
    category: string;
    subcategory: string;
    durationMinutes: number;
    priceCents: number;
    createdAt: string;
}

export interface ProfessionalResponse {
    id: number;
    name: string;
    phone: string;
    address?: AddressResponse;
    bio: string;
    specialtyIds: number[];
    rating: number;
    totalReviews: number;
    workStartTime: string;
    workEndTime: string;
    workingDays: string[];
    active: boolean;
    createdAt: string;
    updatedAt: string;
}
