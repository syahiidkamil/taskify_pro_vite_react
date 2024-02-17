import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

import {
  TaskListPageContainer,
  TaskListTitle,
  TaskListSubtitle,
  TaskListInputContainer,
  TaskListInput,
  AddTaskButton,
  TaskListContainer,
  LogoutButton,
} from "./TaskListPage.styles";
import TaskItemComponent from "../../components/TaskItem/TaskItem.component";

const handleLogout = () => {
  console.log("User logged out");
};

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

const TaskPage: React.FC = () => {
  return (
    <TaskListPageContainer>
      <TaskListTitle>Taskify Pro</TaskListTitle>
      <TaskListSubtitle>Level up your productivity game! ✨</TaskListSubtitle>
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

export default TaskPage;
