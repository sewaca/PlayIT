import { origin } from "..";

export const acceptTask = (taskId: number, userId: number) =>
  fetch(origin + "tasks/accept", {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ taskId: taskId, userId: userId }),
  });
