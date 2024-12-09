import { apiRequest } from "../client";
import { RegisterInput, RegisterResponse, LoginInput, LoginResponse } from "../../types/auth";

export const registerUser = async (input: RegisterInput): Promise<RegisterResponse> => {
    return apiRequest<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
    });
};

export const loginUser = async (input: LoginInput): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(input),
    });
};