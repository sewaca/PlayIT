import { origin } from "..";

export interface GetTaskResponse {
  id: number;
  difficulty: string;
  name: string;
  age: number;
  description: string;
  image: string; // url
}

export const getTask = (userId: number) =>
  fetch(origin + "8215/tasks/get?id=" + userId, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data as GetTaskResponse);
