import { origin } from "..";

interface DislikePersonProps {
  id: number;
  disliked: number;
}
// TODO: Сделать нормальную типизацию ответа
export function dislikePerson(props: DislikePersonProps): Promise<unknown> {
  return fetch(origin + "8212/peopleNear/dislike", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(props),
  });
}
