"use client";

import { TaskForm } from "@/components/TaskForm";
import { useGetTask, useUpdateTask } from "@/hooks/useTask";
import { TaskFormValues } from "@/types/task";
import { useRouter } from "next/navigation";

const EditTaskPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const { data: task, isLoading } = useGetTask(id);
  const updateTask = useUpdateTask();

  const handleSubmit = async (values: TaskFormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    updateTask.mutate(
      { id, task: values },
      {
        onSuccess: () => {
          alert("Task updated successfully");
          router.push("/tasks");
        },
        onError: (error) => {
          alert(error.message);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm
        initialValues={{
          name: task?.name || "",
          description: task?.description || "",
          finished_at: task?.finished_at || "",
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditTaskPage;
