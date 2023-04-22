import { origin } from "..";

interface LikePersonProps {
  id: number;
  liked: number;
}
// TODO: Сделать нормальную типизацию ответа
export function likePerson(props: LikePersonProps) {
  return fetch(origin + "8212/peopleNear/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
}
