import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MdAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import {
  TaskListPageContainer,
  TaskListTitle,
  TaskListSubtitle,
  TaskListInputContainer,
  TaskListInput,
  AddTaskButton,
  TaskListContainer,
  LogoutButton,
  FilterSelect,
  FilterSortContainer,
  SortSelect,
  FilterLabel,
  SortLabel,
} from "./TaskListPage.styles";
import TaskItemComponent from "../../components/TaskItem/TaskItem.component";
import { deleteTokensCookies } from "../../utils/auth.utils";
import { FaFilter, FaSort } from "react-icons/fa";
import { FILTER_OPTIONS, SORT_OPTION } from "./TaskList.config";
import useTaskApi from "../../hooks/useTaskApi";
import { TaskI } from "../../interface/Task.interface";
import EditTaskModal from "../../components/EditTaskModal";
import { parseSortOption } from "../../utils/taskSorting.utils";
import { TASK_STATUS } from "../../interface/Tasks.enum";
import { axiosInstance } from "../../api/axiosInstance";
import { LOGOUT_URL } from "../../constants/api.constants";

const TaskListPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchTasks, addTask, deleteTask, updateTask, updateTaskStatus } =
    useTaskApi();
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskI | null>(null);
  const [filter, setFilter] = useState("");
  const [sortOption, setSortOption] = useState("createdDate-asc");

  const handleLogout = () => {
    axiosInstance.post(
      LOGOUT_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    deleteTokensCookies();
    navigate("/login");
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    const optimisticId = `${Date.now().toString()}-${newTaskTitle}`;

    const optimisticTask = {
      id: optimisticId,
      title: newTaskTitle,
      status: TASK_STATUS.PENDING,
    };
    setTasks((prevTasks) => [...prevTasks, optimisticTask]);
    setNewTaskTitle("");
    try {
      const newTask = await addTask({ title: newTaskTitle });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === optimisticId ? newTask : task))
      );
    } catch (error) {
      console.error("Failed to add task:", error);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== optimisticId)
      );
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const previousTasks = [...tasks];

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );

    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
      setTasks(previousTasks);
    }
  };

  const handleEditTask = (task: TaskI) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleSaveTask = async (updatedTask: Partial<TaskI>) => {
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
    const previousTask = tasks[taskIndex];

    setTasks((currentTasks) =>
      currentTasks.map((task, index) =>
        index === taskIndex ? { ...task, ...updatedTask } : task
      )
    );

    try {
      const response = await updateTask(updatedTask.id as string, updatedTask);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === response.id ? response : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
      setTasks((currentTasks) =>
        currentTasks.map((task, index) =>
          index === taskIndex ? previousTask : task
        )
      );
    }
  };

  const handleCloseModal = () => setIsEditing(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleToggleStatus = async (taskId: string, newStatus: TASK_STATUS) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Failed to toggle task status:", error);
      // Revert the optimistic update
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId ? { ...task, status: task.status } : task
        )
      );
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const { sort, order } = parseSortOption(sortOption);
        const fetchedTasks = await fetchTasks({
          status: filter ? filter : undefined,
          sort: sort ? sort : undefined,
          order: order ? order : undefined,
        });
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, sortOption]);

  return (
    <TaskListPageContainer>
      <TaskListTitle>Taskify Pro</TaskListTitle>
      <TaskListSubtitle>Level up your productivity game! ✨</TaskListSubtitle>
      <FilterSortContainer>
        <div>
          <FilterLabel>
            <FaFilter /> Filter
            <FilterSelect defaultValue="ALL" onChange={handleFilterChange}>
              {FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
          </FilterLabel>
        </div>
        <div>
          <SortLabel>
            <FaSort /> Sort
            <SortSelect
              defaultValue="createdAt-asc"
              onChange={handleSortChange}
            >
              {SORT_OPTION.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SortSelect>
          </SortLabel>
        </div>
      </FilterSortContainer>
      <TaskListInputContainer>
        <TaskListInput
          placeholder="What's next on the agenda?"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <AddTaskButton onClick={handleAddTask}>
          <MdAddCircleOutline size="24px" />
        </AddTaskButton>
      </TaskListInputContainer>
      <TaskListContainer>
        {tasks.map((task: TaskI) => (
          <TaskItemComponent
            key={`${task?.id}`}
            task={task}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </TaskListContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      {isEditing && currentTask && (
        <EditTaskModal
          task={currentTask}
          onSave={handleSaveTask}
          onClose={handleCloseModal}
        />
      )}
    </TaskListPageContainer>
  );
};

export default TaskListPage;
