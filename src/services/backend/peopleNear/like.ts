import { origin } from "..";

interface LikePersonProps {
  id: number;
  liked: number;
}
// TODO: Сделать нормальную типизацию ответа
export function likePerson(props: LikePersonProps): Promise<unknown> {
  return fetch(origin + "peopleNear/like", {
    method: "POST",
    body: JSON.stringify(props),
  });
}
