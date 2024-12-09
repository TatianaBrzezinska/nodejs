export const getToken = () => localStorage.getItem("token");

export const saveToken = (token: string) => {
    try {
        localStorage.setItem("token", token);
    } catch (error) {
        console.error("Failed to save token:", error);
    }
};