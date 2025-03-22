export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed'
}

export interface Task {
[x: string]: any;
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt?: Date;
}
