import { getTask, createTask, updateTask, deleteTask } from "@/api/requests/task";
import { TaskInput, TaskResponse } from "@/types/task";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetTask = (id: string) =>
  useQuery<TaskResponse, Error>({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
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
