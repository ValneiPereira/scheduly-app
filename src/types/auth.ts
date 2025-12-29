export interface LoginRequest {
    email: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
    email: string;
    role: string;
    ownerId: number;
}

export interface RegisterClientRequest {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password?: string;
}
