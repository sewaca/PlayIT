import { configureStore } from "@reduxjs/toolkit";
import { userInfoReducer, UserInfoState } from "./userInfo";
import {
  PageInfo as PageInfoState,
  OpenedPagesInfo,
  pageReducer,
} from "./pageInfo";

export interface Store {
  user: UserInfoState;
  page: OpenedPagesInfo;
}

export const store = configureStore<Store>({
  reducer: {
    user: userInfoReducer,
    page: pageReducer,
  },
});

export {
  setPage,
  openPage,
  closePage,
  type PageInfo as PageInfoState,
  type AllPages as Page,
  type OpenedPagesInfo,
} from "./pageInfo";
export { setUserData, type UserInfoState } from "./userInfo";
