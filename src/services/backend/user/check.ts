import { origin } from "..";

export const checkUser = (id: number) =>
  fetch(origin + "8210/user/check?id=" + id).then((res) => res.json());
