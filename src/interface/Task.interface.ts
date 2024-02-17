import { TASK_STATUS } from "./Tasks.enum";

export interface TaskI {
  id: string;
  title?: string;
  description?: string;
  priority?: number;
  status?: TASK_STATUS;
  dueDate?: Date;
}
