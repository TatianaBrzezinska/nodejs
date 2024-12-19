import { getTask, createTask, updateTask, deleteTask } from "@/api/requests/task";
import { TaskInput, TaskResponse } from "@/types/task";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetTask = (id: string, options?: Omit<UseQueryOptions<TaskResponse, Error>, "queryKey" | "queryFn">) =>
  useQuery<TaskResponse, Error>({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
    ...options,
  });

export const useCreateTask = () =>
  useMutation<TaskResponse, Error, TaskInput>({
    mutationFn: createTask,
  });

export const useUpdateTask = () =>
  useMutation<TaskResponse, Error, { id: string; task: TaskInput }>({
    mutationFn: ({ id, task }) => updateTask(id, task),
  });

export const useDeleteTask = () =>
  useMutation<TaskResponse, Error, string>({
    mutationFn: (id: string) => deleteTask(id),
  });
