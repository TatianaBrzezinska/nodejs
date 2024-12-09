"use client";

import { TaskForm } from "@/components/TaskForm";
import { useCreateTask } from "@/hooks/useTask";
import { TaskFormValues } from "@/types/task";

import { useRouter } from "next/navigation";

const CreateTaskPage = () => {
  const router = useRouter();
  const createTask = useCreateTask();

  const handleSubmit = async (values: TaskFormValues, setSubmitting: (isSubmitting: boolean) => void) => {
    createTask.mutate(values, {
      onSuccess: () => {
        alert("Task created successfully");
        router.push("/tasks");
      },
      onError: (error) => {
        alert(error.message);
        setSubmitting(false);
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center text-white">Create New Task</h1>
      </div>
      <div className="min-w-[400px] w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 bg-gray-200">
        <TaskForm initialValues={{ name: "", description: "", finished_at: "" }} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateTaskPage;
