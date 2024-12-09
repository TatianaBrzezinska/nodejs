"use client";

import { useRouter } from "next/navigation";
import { Task } from "@/types/task";
import { TrashIcon } from "@heroicons/react/outline";

const colors = [
  "bg-red-800 hover:bg-red-700",
  "bg-green-800 hover:bg-green-700",
  "bg-blue-800 hover:bg-blue-700",
  "bg-yellow-800 hover:bg-yellow-700",
  "bg-indigo-800 hover:bg-indigo-700",
  "bg-purple-800 hover:bg-purple-700",
  "bg-pink-800 hover:bg-pink-700",
  "bg-emerald-800 hover:bg-emerald-700",
];
interface TaskCardInterface {
  task: Task;
  index: number;
  deleteTask: (id: string) => void;
}

export const TaskCard = ({ task, index, deleteTask }: TaskCardInterface) => {
  const router = useRouter();

  const handleClickCard = () => {
    router.push(`/task/${task.id}`);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div className={`relative p-4 rounded shadow-md cursor-pointer ${colors[index % colors.length]} m-2`} onClick={handleClickCard}>
      <h3 className="font-bold text-lg">{task.name}</h3>
      <p>{task.description}</p>
      <small>Created: {new Date(task.created_at).toLocaleDateString()}</small>
      {task.finished_at && <small className="block">Finished: {new Date(task.finished_at).toLocaleDateString()}</small>}
      <button onClick={handleDeleteClick} className="absolute bottom-2 right-2 text-white hover:text-gray-200">
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
};
