import { apiRequest } from "../client";
import { Task } from "../../types/task";

export const getTasks = async (): Promise<Task[]> => {
    return apiRequest<Task[]>("/tasks", {
        method: "GET",
    });
};