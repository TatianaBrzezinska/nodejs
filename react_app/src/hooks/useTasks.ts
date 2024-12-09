import { useQuery } from "@tanstack/react-query";

import { Task } from "@/types/task";
import { getTasks } from "@/api/requests/tasks";

export const useTasks = () =>
    useQuery<Task[], Error>({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });