export interface RegisterInput {
    username: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}