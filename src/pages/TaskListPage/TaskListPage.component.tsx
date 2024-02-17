import React, { useEffect, useState } from "react";
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
    deleteTokensCookies();
    navigate("/login");
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const newTask = await addTask({ title: newTaskTitle });
      setTasks((prevTask) => [...prevTask, newTask]);
      setNewTaskTitle("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEditTask = (task: TaskI) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  const handleSaveTask = async (updatedTask: Partial<TaskI>) => {
    try {
      const response = await updateTask(updatedTask.id as string, updatedTask);
      setTasks(
        tasks.map((task) => (task.id === response.id ? response : task))
      );
    } catch (error) {
      console.error("Failed to update task:", error);
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
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to toggle task status:", error);
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
