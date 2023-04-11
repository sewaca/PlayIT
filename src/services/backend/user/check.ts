import { origin } from "..";

export const checkUser = (id: number) =>
  fetch(origin + "user/check?id=" + id).then((res) => res.json());
