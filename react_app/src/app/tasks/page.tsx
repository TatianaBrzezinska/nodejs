"use client";

import { useRouter } from "next/navigation";
import { TaskCard } from "../../components/TaskCard";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { useDeleteTask } from "@/hooks/useTask";
import { useQueryClient } from "@tanstack/react-query";

export default function TasksPage() {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const { mutate: deleteTask, isPending: isDeleteLoading } = useDeleteTask();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleDelete = (id: string) => {
    deleteTask(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        alert(`Task ${id} deleted successfully`);
      },
      onError: (error) => {
        alert(`Error deleting task ${id}: ${error} }`);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading tasks...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-400">Something went wrong fetching tasks.</p>
          {error instanceof Error ? <p className="text-sm text-gray-200 mt-2">{error.message}</p> : <p className="text-sm text-gray-200 mt-2">Unknown error occurred.</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {tasks && tasks.length > 0 ? (
        <div>
          <button className="absolute top-4 right-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => router.push("/task/")}>
            Add New Task
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} deleteTask={handleDelete} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg font-semibold">You don’t have any tasks. Create your first task!</p>
          {isDeleteLoading ? (
            "..."
          ) : (
            <Link href="/task/">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">Create First Task</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
