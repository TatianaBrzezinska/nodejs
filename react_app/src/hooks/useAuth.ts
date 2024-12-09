import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../api/requests/auth";
import { saveToken } from "../utils/authStorage";
import { RegisterResponse, RegisterInput, LoginResponse, LoginInput } from "../types/auth";

export const useRegister = () =>
    useMutation<RegisterResponse, Error, RegisterInput>({
        mutationFn: registerUser,
    });

export const useLogin = () =>
    useMutation<LoginResponse, Error, LoginInput>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            saveToken(data.token);
        },
        onError: (error: Error) => {
            console.log(error.message);
        },
    });