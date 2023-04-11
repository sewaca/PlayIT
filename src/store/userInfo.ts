import { createAction, createReducer } from "@reduxjs/toolkit";

export interface UserInfoState {
  id?: number;
  name?: {
    first?: string;
    second?: string;
  };
  avatar?: string;
  faculty?: string;
  age?: number;
  aboutme?: string;
  status?: string;
  interests?: string;
}
export const setUserData = createAction<UserInfoState>("setUser");

const initialState: UserInfoState = {
  id: Number(localStorage.getItem("userId")) || undefined,
};

export const userInfoReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserData, (state, action) => {
    const newState = { ...state, ...action.payload };
    localStorage.setItem("userId", (newState.id || 0).toString());
    return newState;
  });
});
