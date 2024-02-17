import { TASK_PRIORITY } from "../interface/tasks.type";

export const mapNumberToPriorityEnum = (
  priorityNumber: number
): TASK_PRIORITY => {
  const mapping: { [key: string]: TASK_PRIORITY } = {
    "0": TASK_PRIORITY.LOW,
    "1": TASK_PRIORITY.MEDIUM,
    "2": TASK_PRIORITY.HIGH,
    "3": TASK_PRIORITY.CRITICAL,
  };

  return mapping[String(priorityNumber)] || TASK_PRIORITY.LOW;
};

export const mapPriorityEnumToNumber = (
  priorityEnum: TASK_PRIORITY
): number => {
  const mapping: { [key in TASK_PRIORITY]: number } = {
    [TASK_PRIORITY.LOW]: 0,
    [TASK_PRIORITY.MEDIUM]: 1,
    [TASK_PRIORITY.HIGH]: 2,
    [TASK_PRIORITY.CRITICAL]: 3,
  };

  return mapping[priorityEnum];
};
