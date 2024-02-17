/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxiosPrivate from "./useAxiosPrivate";
import { TaskI } from "../interface/Task.interface";
import { TASK_STATUS } from "../interface/Tasks.enum";

const useTaskApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchTasks = async ({
    sort,
    limit = 1000,
    offset = 0,
    order,
    status,
  }: {
    sort?: string;
    limit?: number;
    offset?: number;
    order?: string;
    status?: string;
  }) => {
    try {
      const response = await axiosPrivate.get("/tasks", {
        params: { sort, order, limit, offset, status },
      });
      return response.data;
    } catch (error: any) {
      alert(error?.message);
      return [];
    }
  };

  const addTask = async (task: Partial<TaskI>) => {
    try {
      const response = await axiosPrivate.post("/tasks", task);
      return response.data;
    } catch (error: any) {
      return {};
    }
  };

  const updateTask = async (taskId: string, taskRaw: Partial<TaskI>) => {
    try {
      const { id: _id, ...task } = taskRaw;
      const response = await axiosPrivate.put(`/tasks/${taskId}`, task);
      return response.data;
    } catch (error: any) {
      return {};
    }
  };

  const updateTaskStatus = async (taskId: string, status: TASK_STATUS) => {
    try {
      const response = await axiosPrivate.patch(`/tasks/${taskId}/status`, {
        status,
      });
      return response.data;
    } catch (error: any) {
      return {};
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await axiosPrivate.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error: any) {
      return {};
    }
  };

  return {
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};

export default useTaskApi;
