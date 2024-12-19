"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useAuth } from "../context/AuthContext";
import { TrashIcon } from "@heroicons/react/outline";
import TaskModal from "@/components/TaskModal";
import { useDeleteTask } from "@/hooks/useTask";

const colors = [
  "bg-red-700 hover:bg-red-800",
  "bg-green-700 hover:bg-green-800",
  "bg-blue-700 hover:bg-blue-800",
  "bg-yellow-700 hover:bg-yellow-800",
  "bg-indigo-700 hover:bg-indigo-800",
  "bg-purple-700 hover:bg-purple-800",
  "bg-pink-700 hover:bg-pink-800",
  "bg-emerald-700 hover:bg-emerald-800",
];

function getColorIndexFromId(id: string, colorsLength: number) {
  const charSum = Array.from(id).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return charSum % colorsLength;
}

export default function HomePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const { data: tasks, isLoading: tasksLoading, isError, error, refetch } = useTasks();
  const { mutate: deleteTask } = useDeleteTask();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ["tasks"],
      exact: true,
    });

    queryClient.removeQueries({
      queryKey: ["tasks"],
      exact: true,
    });
  }, []);

  useEffect(() => {
    if (!isLoading && user) {
      refetch();
    }
  }, [user, isLoading, refetch]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleCreateTask = () => {
    setModalMode("create");
    setSelectedTaskId(undefined);
    setIsModalOpen(true);
  };

  const handleEditCard = (taskId: string) => {
    setModalMode("edit");
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, taskId: string) => {
    e.stopPropagation();
    deleteTask(taskId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        alert(`Task deleted successfully`);
      },
      onError: (error) => {
        alert(`Error deleting task ${taskId}: ${error} }`);
      },
    });
  };

  if (isLoading || tasksLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (!user) {
    return null;
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
      <button onClick={logout} className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
      <p className="absolute top-16 right-4  text-md font-bold">Welcome, {user.username}!</p>

      {tasks && tasks.length > 0 ? (
        <>
          <button className="absolute top-4 right-28 bg-blue-500 text-white py-2 px-4 rounded" onClick={handleCreateTask}>
            Add New Task
          </button>
          <h1 className="text-4xl font-bold mb-16">Here are your tasks:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.map((task, index) => {
              const colorIndex = getColorIndexFromId(task.id, colors.length);
              const taskColor = colors[colorIndex];
              return (
                <div key={task.id} className={`min-w-[260px] relative p-6 rounded shadow-md cursor-pointer ${taskColor} m-2`} onClick={() => handleEditCard(task.id)}>
                  <h3 className="font-bold text-lg">{task.name}</h3>
                  <p>{task.description}</p>
                  <small>
                    Created:{" "}
                    {new Date(task.created_at).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                  {task.finished_at && (
                    <small className="block">
                      Finished:{" "}
                      {new Date(task.finished_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  )}
                  <button onClick={(e) => handleDeleteClick(e, task.id)} className="absolute bottom-2 right-2 text-white hover:text-gray-200">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-2xl font-semibold mb-8">You don’t have any tasks. Create your first task!</p>
          <button onClick={handleCreateTask} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
            Create First Task
          </button>
        </div>
      )}
      <TaskModal
        isOpen={isModalOpen}
        title={modalMode === "create" ? "Create New Task" : "Edit Task"}
        mode={modalMode}
        taskId={selectedTaskId}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["tasks"] });
          queryClient.invalidateQueries({ queryKey: ["task", selectedTaskId] });
        }}
      />
    </div>
  );
}
