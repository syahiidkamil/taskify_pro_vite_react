import React from "react";
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

const tasks = [
  {
    id: "1",
    title: "Revamp the task page UI",
    description: "Update the UI to be more user-friendly.",
    priority: 3,
    status: "PENDING",
    dueDate: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Implement state management",
    description: "Set up state management for the app.",
    priority: 2,
    status: "PENDING",
    dueDate: new Date().toISOString(),
  },
];

const TaskListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteTokensCookies();
    navigate("/login");
  };

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
        <TaskListInput placeholder="What's next on the agenda?" />
        <AddTaskButton>
          <MdAddCircleOutline size="24px" />
        </AddTaskButton>
      </TaskListInputContainer>
      <TaskListContainer>
        {tasks.map((task) => (
          <TaskItemComponent
            key={task.id}
            task={task}
            onDelete={(id) => console.log(`Delete task ${id}`)}
          />
        ))}
      </TaskListContainer>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </TaskListPageContainer>
  );
};

export default TaskListPage;
