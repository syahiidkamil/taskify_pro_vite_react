import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  TaskCheckbox,
  TaskText,
  TaskActions,
  IconButton,
  DeleteButton,
  TaskItem,
} from "./TaskItem.styles";

type TaskItemProps = {
  task: {
    id: string;
    title: string;
    status: string;
  };
  onDelete: (id: string) => void;
};

const TaskItemComponent: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <TaskItem key={task.id}>
      <TaskCheckbox
        type="checkbox"
        checked={task.status === "COMPLETED"}
        readOnly
      />
      <TaskText>{task.title}</TaskText>
      <TaskActions>
        <IconButton>
          <FaEdit />
        </IconButton>
        <DeleteButton onClick={() => onDelete(task.id)}>
          <FaTrashAlt />
        </DeleteButton>
      </TaskActions>
    </TaskItem>
  );
};

export default TaskItemComponent;
