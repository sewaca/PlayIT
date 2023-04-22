import { origin } from "..";

export const rejectTask = (taskId: number, userId: number) =>
  fetch(origin + "8215/tasks/reject", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId: taskId, userId: userId }),
  });
