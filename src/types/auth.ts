export interface LoginRequest {
    email: string;
    password?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    role: string;
    ownerId: number;
}

export interface RefreshTokenResponse {
    accessToken: string;
}

export interface RegisterClientRequest {
    name: string;
    email: string;
    cpf: string;
    phone: string;
    password?: string;
}

export interface AuthState {
    accessToken: string | null;
    email: string | null;
    role: string | null;
    ownerId: string | null;
}
