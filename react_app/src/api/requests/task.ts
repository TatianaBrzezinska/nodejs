import { apiRequest } from "../client";
import { TaskInput, TaskResponse } from "../../types/task";


export const getTask = async (id: string): Promise<TaskResponse> => {
    return apiRequest<TaskResponse>(`/task_details/${id}`, {
        method: "GET",
    });
};

export const createTask = async (input: TaskInput): Promise<TaskResponse> => {
    return apiRequest<TaskResponse>("/task_details", {
        method: "POST",
        body: JSON.stringify(input),
    });
};

export const updateTask = async (id: string, input: TaskInput): Promise<TaskResponse> => {
    return apiRequest<TaskResponse>(`/task_details/${id}`, {
        method: "PUT",
        body: JSON.stringify(input),
    });
};

export const deleteTask = async (id: string): Promise<TaskResponse> => {
    return apiRequest<TaskResponse>(`/task_details/${id}`, {
        method: "DELETE",
    });
};