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
import { TASK_STATUS } from "../../interface/tasks.type";

type TaskItemProps = {
  task: TaskI;
  onDelete: (id: string) => void;
  onEdit: (task: TaskI) => void;
};

const TaskItemComponent: React.FC<TaskItemProps> = ({
  task,
  onDelete,
  onEdit,
}) => {
  return (
    <TaskItem key={task.id}>
      <TaskCheckbox
        type="checkbox"
        checked={task.status === TASK_STATUS.COMPLETE}
        readOnly
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
