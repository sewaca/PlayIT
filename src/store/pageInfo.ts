import { createAction, createReducer } from "@reduxjs/toolkit";
import { pushHistoryStatePage } from "~/utils/routing";

// TYPES & INTERFACES :
type EmptyPage = "";
type RegistrationPage = "registration";
type ProfilePage = "profile";
type PeopleNearPage = "peopleNear";
type MissionsPage = "missions";
type StorePage = "store";
type MessagesPage = "messages";
export type AllPages =
  | RegistrationPage
  | EmptyPage
  | ProfilePage
  | PeopleNearPage
  | MissionsPage
  | StorePage
  | MessagesPage;

export interface OpenedPagesInfo {
  page: Array<AllPages>;
  step?: (1 | 2 | "2+" | 3)[]; // for registration page
  id?: number; // for profile page
  openedProfile?: number; // for people near
  openedChat?: number; // for messages
}

export interface PageInfo {
  page: AllPages;
  step?: (1 | 2 | "2+" | 3)[]; // for registration page
  id?: number; // for profile page
  openedChat?: number; // for messages
}

// ACTIONS:
export const setPage = createAction<PageInfo>("setPageInfo");
export const closePage = createAction<AllPages>("closePage");
export const openPage = createAction<PageInfo>("openPage");
// Initial State
const initialState: OpenedPagesInfo = { page: [""] };
// Reducer
export const pageReducer = createReducer<OpenedPagesInfo>(
  initialState,
  (builder) => {
    builder
      .addCase(setPage, (state, action) => {
        pushHistoryStatePage({
          page: action.payload.page,
          payload: action.payload,
        });

        return { ...action.payload, page: [action.payload.page] };
      })
      .addCase(closePage, (state, action) => {
        const pages = state.page.filter((item) => item !== action.payload);
        pushHistoryStatePage({
          page: pages.slice(-1)[0] || "",
          payload: { ...state },
        });
        return {
          ...state,
          page: pages,
        };
      })
      .addCase(openPage, (state, action) => {
        pushHistoryStatePage({
          page: action.payload.page,
          payload: { ...state, ...action.payload },
        });

        return {
          ...state,
          ...action.payload,
          page: [
            ...new Set([...state.page, action.payload.page].reverse()),
          ].reverse(),
        };
      });
  }
);
