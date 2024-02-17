import { TASK_STATUS } from "../../interface/Tasks.type";

export const FILTER_OPTIONS = [
  { value: undefined, label: "All Tasks" },
  { value: TASK_STATUS.COMPLETE, label: "Completed" },
  { value: TASK_STATUS.PENDING, label: "Pending" },
];

export const SORT_OPTION = [
  { value: "createdDate-asc", label: "Created Date Ascending" },
  { value: "createdDate-desc", label: "Created Date Descending" },
  { value: "priority-asc", label: "Priority Ascending" },
  { value: "priority-desc", label: "Priority Descending" },
  { value: "status-asc", label: "Status Ascending" },
  { value: "status-desc", label: "Status Descending" },
  { value: "title-asc", label: "Title Ascending" },
  { value: "title-desc", label: "Title Descending" },
  { value: "dueDate-asc", label: "Due Date Ascending" },
  { value: "dueDate-desc", label: "Due Date Descending" },
];
