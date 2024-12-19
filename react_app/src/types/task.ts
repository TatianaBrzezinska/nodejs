export interface Task {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  finished_at?: string;
}

export interface TaskInput {
  name: string;
  description?: string;
  finished_at?: string;
}

export interface TaskResponse {
  id: string;
  name: string;
  description?: string;
  finished_at?: string;
}

export interface TaskFormValues {
  name: string;
  description?: string;
  finished_at?: string;
}