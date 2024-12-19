export const getToken = () => localStorage.getItem("authToken");

export const saveToken = (token: string) => {
    try {
        localStorage.setItem("authToken", token);
    } catch (error) {
        console.error("Failed to save token:", error);
    }
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
}