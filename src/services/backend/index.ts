export const origin = "http://localhost:";

// User:
export { checkUser } from "./user/check";
export { getUser, type GetUserResponse } from "./user/get";
export { changeUser } from "./user/change";
export { registerUser } from "./user/register";

// People Near:
export * from "./peopleNear/";

// Missions:
export * from "./tasks/";
