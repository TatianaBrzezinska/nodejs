
import { getToken, removeToken } from "../utils/authStorage";

const API_BASE_URL = "http://localhost:3000/api";

interface ApiRequestOptions extends RequestInit {
    auth?: boolean;
}

export const apiRequest = async <T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> => {
    const token = getToken();
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        removeToken();
        window.location.href = "/login";
        return Promise.reject(new Error("Unauthorized"));
    }

    if (!response.ok) {
        let errorMessage = "Request failed";
        try {
            const errorResponse = await response.json();
            errorMessage = errorResponse.message || errorMessage;
        } catch { }
        throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
};