// this is used for uniqu id generation
import { v4 as uuidv4 } from "uuid";

export const addTask = (text) => ({
  type: "ADD",
  payload: {
    id: uuidv4(),
    text,
    completed: false,
    status: "Assign",
  },
});

export const completedTask = (taskID) => ({
  type: "COMPLETE",
  payload: {
    id: taskID,
    status: "Completed",
  },
});

export const deletedTask = (taskID) => ({
  type: "DELETE",
  payload: {
    id: taskID,
    status: "Deleted",
  },
});
let newText = "Hardcoded";
export const editTask = (taskID, newText) => ({
  type: "EDIT",
  payload: {
    id: taskID,
    text: newText,
    status: "EDIT",
  },
});
export const updateStatus = (taskID, newStatus) => ({
  type: 'UPDATE_STATUS',
  payload: {
    id: taskID,
    status: newStatus,
  },
});
