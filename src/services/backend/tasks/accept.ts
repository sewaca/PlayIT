import { origin } from "..";

export const acceptTask = (taskId: number, userId: number) =>
  fetch(origin + "8215/tasks/accept", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId: taskId, userId: userId }),
  });
