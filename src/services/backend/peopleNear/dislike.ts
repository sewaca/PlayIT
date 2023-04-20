import { origin } from "..";

interface DislikePersonProps {
  id: number;
  disliked: number;
}
// TODO: Сделать нормальную типизацию ответа
export function dislikePerson(props: DislikePersonProps): Promise<unknown> {
  return fetch(origin + "peopleNear/dislike", {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(props),
  });
}
