import { origin } from "..";

export const acceptTask = (taskId: number, userId: number) =>
  fetch(origin + "tasks/accept", {
    method: "POST",
    body: JSON.stringify({ taskId: taskId, userId: userId }),
  });
