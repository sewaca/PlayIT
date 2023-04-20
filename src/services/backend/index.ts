export const origin = "http://localhost:821/";

// User:
export { checkUser } from "./user/check";
export { getUser, type GetUserResponse } from "./user/get";
export { changeUser } from "./user/change";
export { registerUser } from "./user/register";

// People Near:
export * from "./peopleNear/";

// Missions:
export { getTask, type GetTaskResponse } from "./tasks/get";
export { acceptTask } from "./tasks/accept";
