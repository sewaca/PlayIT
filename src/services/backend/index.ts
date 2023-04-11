export const origin = "http://localhost:821/";

export { checkUser } from "./user/check";
export { getUser, type GetUserResponse } from "./user/get";
export { changeUser } from "./user/change";
export { getPeopleNear, type GetPeopleNearResponse } from "./peopleNear/get";
export { likePerson } from "./peopleNear/like";
export { getTask, type GetTaskResponse } from "./tasks/get";
export { acceptTask } from "./tasks/accept";
