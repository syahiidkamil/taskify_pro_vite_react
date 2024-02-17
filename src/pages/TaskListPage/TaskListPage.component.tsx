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

const TaskListPage: React.FC = () => {
  const navigate = useNavigate();
  const { fetchTasks, addTask, deleteTask } = useTaskApi();
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

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

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    loadTasks();
  }, []);

  return (
    <TaskListPageContainer>
      <TaskListTitle>Taskify Pro</TaskListTitle>
      <TaskListSubtitle>Level up your productivity game! ✨</TaskListSubtitle>
      <FilterSortContainer>
        <div>
          <FilterLabel>
            <FaFilter /> Filter
            <FilterSelect defaultValue="ALL">
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
            <SortSelect defaultValue="createdAt-asc">
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
          />
        ))}
      </TaskListContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </TaskListPageContainer>
  );
};

export default TaskListPage;
