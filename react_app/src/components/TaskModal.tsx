"use client";

import React, { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { useCreateTask, useGetTask, useUpdateTask } from "@/hooks/useTask";
import { TaskFormValues } from "@/types/task";
import Modal from "@/components/Modal";

interface TaskModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  title: string;
  taskId?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, mode, taskId, title, onClose, onSuccess }) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const { data: task, isLoading: isTaskLoading } = useGetTask(taskId as string, {
    enabled: mode === "edit" && Boolean(taskId),
  });

  const [initialValues, setInitialValues] = useState<TaskFormValues>({
    name: "",
    description: "",
    finished_at: "",
  });
  useEffect(() => {
    if (mode === "edit" && task && !isTaskLoading) {
      setInitialValues({
        name: task.name || "",
        description: task.description || "",
        finished_at: task.finished_at || "",
      });
    } else if (mode === "create") {
      setInitialValues({
        name: "",
        description: "",
        finished_at: "",
      });
    }
  }, [task, mode, isTaskLoading]);

  const handleSubmit = async (values: TaskFormValues, setSubmitting: (val: boolean) => void) => {
    if (mode === "create") {
      createTask.mutate(values, {
        onSuccess: () => {
          alert("Task created successfully");
          if (onSuccess) onSuccess();
          onClose();
        },
        onError: (error: any) => {
          alert(error.message);
          setSubmitting(false);
        },
      });
    } else if (mode === "edit" && taskId) {
      updateTask.mutate(
        { id: taskId, task: values },
        {
          onSuccess: () => {
            alert("Task updated successfully");
            if (onSuccess) onSuccess();
            onClose();
          },
          onError: (error: any) => {
            alert(error.message);
            setSubmitting(false);
          },
        }
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {mode === "edit" && isTaskLoading ? <div>Loading...</div> : <TaskForm initialValues={initialValues} onSubmit={handleSubmit} />}
    </Modal>
  );
};

export default TaskModal;
