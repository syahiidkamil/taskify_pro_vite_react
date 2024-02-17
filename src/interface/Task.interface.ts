import { TASK_STATUS } from "./Tasks.type";

export interface TaskI {
  id: string;
  title?: string;
  description?: string;
  priority?: number;
  status?: TASK_STATUS;
  dueDate?: Date;
}
