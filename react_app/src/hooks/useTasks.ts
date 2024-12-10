import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/requests/tasks";
import { useAuth } from "@/context/AuthContext";

export const useTasks = () => {
    const { user } = useAuth();

    return useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
        refetchOnMount: "always",
        enabled: !!user,
    });
};
