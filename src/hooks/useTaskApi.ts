/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxiosPrivate from "./useAxiosPrivate";
import { TaskI } from "../interface/Task.interface";

const useTaskApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const fetchTasks = async (
    sort = "priority",
    limit = 10,
    offset = 0,
    order = "desc"
  ) => {
    try {
      const response = await axiosPrivate.get("/tasks", {
        params: { sort, order, limit, offset },
      });
      return response.data;
    } catch (error: any) {
      alert(error?.message);
      return [];
    }
  };

  const addTask = async (task: TaskI) => {
    try {
      const response = await axiosPrivate.post("/tasks", task);
      return response.data;
    } catch (error: any) {
      return {};
    }
  };

  const updateTask = async (taskId: string, task: TaskI) => {
    try {
      const response = await axiosPrivate.patch(`/tasks/${taskId}`, task);
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
  };
};

export default useTaskApi;
