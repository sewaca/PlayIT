import { PageInfoState } from "../../store";

export function pathToEvent(): PageInfoState {
  const path = window.location.pathname;

  // Люди рядом
  if (path.includes("/peopleNear"))
    return { page: "peopleNear", };
  // Профиль пользователя
  if (path.includes("/profile/"))
    return parseInt(path.replace("/profile/", ""))
      ? {
          page: "profile",
          id: parseInt(path.replace("/profile/", "")),
        }
      : { page: "" };
  // Задания
  if (path.includes("/missions")) return { page: "missions" };
  // Магазин
  if (path.includes("/store")) return { page: "store" };
  //
  if (path.includes("/messages"))
    return parseInt(path.replace("/messages/", ""))
      ? {
          page: "messages",
          openedChat: parseInt(path.replace("/messages/", "")),
        }
      : { page: "messages" };
  // Пустая страница
  return { page: "" };
}
