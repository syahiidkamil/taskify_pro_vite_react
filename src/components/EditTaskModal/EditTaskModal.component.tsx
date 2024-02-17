import React, { useState } from "react";
import { TaskI } from "../../interface/Task.interface";
import {
  ModalBackdrop,
  ModalContent,
  ModalTitle,
  ModalInput,
  ModalTextArea,
  ModalButton,
  ModalSelect,
  ModalCheckboxLabel,
  ModalLabel,
} from "./EditTaskModal.styles";
import {
  mapNumberToPriorityEnum,
  mapPriorityEnumToNumber,
} from "../../utils/priorityMapping";
import { TASK_STATUS, TASK_PRIORITY } from "../../interface/tasks.type";

type EditTaskModalProps = {
  task: TaskI;
  onSave: (updatedTask: Partial<TaskI>) => void;
  onClose: () => void;
};

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(
    mapNumberToPriorityEnum(task.priority || 0)
  );
  const [status, setStatus] = useState(task.status === TASK_STATUS.COMPLETE);

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      priority: mapPriorityEnumToNumber(priority),
      status: status ? TASK_STATUS.COMPLETE : TASK_STATUS.PENDING,
    });
    onClose();
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Edit Task</ModalTitle>
        <ModalLabel htmlFor="taskTitle">Title</ModalLabel>
        <ModalInput
          id="taskTitle"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />
        <ModalLabel htmlFor="taskDescription">Description</ModalLabel>
        <ModalTextArea
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
        />
        <ModalLabel htmlFor="taskPriority">Priority</ModalLabel>
        <ModalSelect
          id="taskPriority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TASK_PRIORITY)}
        >
          {Object.values(TASK_PRIORITY).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </ModalSelect>
        <ModalCheckboxLabel htmlFor="taskStatus">
          Status
          <input
            id="taskStatus"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
          />
        </ModalCheckboxLabel>
        <ModalButton onClick={handleSave}>Save</ModalButton>
        <ModalButton onClick={onClose}>Close</ModalButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EditTaskModal;
