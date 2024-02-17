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
import { TaskI } from "../../interface/Task.interface";
import { TASK_STATUS } from "../../interface/Tasks.enum";

type TaskItemProps = {
  task: TaskI;
  onDelete: (id: string) => void;
  onEdit: (task: TaskI) => void;
  onToggleStatus: (taskId: string, newStatus: TASK_STATUS) => void;
};

const TaskItemComponent: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
  onToggleStatus,
}) => {
  const handleStatusChange = () => {
    const newStatus =
      task.status === TASK_STATUS.COMPLETE
        ? TASK_STATUS.PENDING
        : TASK_STATUS.COMPLETE;
    onToggleStatus(task.id, newStatus);
  };

  return (
    <TaskItem key={task.id}>
      <TaskCheckbox
        type="checkbox"
        checked={task.status === TASK_STATUS.COMPLETE}
        onChange={handleStatusChange}
      />
      <TaskText>{task.title}</TaskText>
      <TaskActions>
        <IconButton onClick={() => onEdit(task)}>
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
