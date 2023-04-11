import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer, UserInfoState } from "./userInfo";
import { PageInfoState, pageReducer } from "./pageInfo";

export interface Store {
  user: UserInfoState;
  page: PageInfoState;
}

export const store = configureStore<Store>({
  reducer: {
    user: userInfoReducer,
    page: pageReducer,
  },
});

export { setPage, type PageInfoState } from "./pageInfo";
export { setUserData, type UserInfoState } from "./userInfo";
