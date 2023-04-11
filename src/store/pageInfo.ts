import { createAction, createReducer } from "@reduxjs/toolkit";

// Page types :
interface EmptyPage {
  page: "";
}
interface RegistrationPage {
  page: "registration";
  step?: (1 | 2 | "2+" | 3)[];
}
interface ProfilePage {
  page: "profile";
  id: number;
}
interface PeopleNearPage {
  page: "peopleNear";
  openedProfile?: number;
}
interface MissionsPage {
  page: "missions";
}
interface StorePage {
  page: "store";
}
interface MessagesPage {
  page: "messages";
  openedChat?: number;
}
export type PageInfoState =
  | RegistrationPage
  | EmptyPage
  | ProfilePage
  | PeopleNearPage
  | MissionsPage
  | StorePage
  | MessagesPage;
// ACTIONS:
export const setPage = createAction<PageInfoState>("setPageInfo");
// Initial State
const initialState: PageInfoState = {
  page: "",
};
// Reducer
export const pageReducer = createReducer<PageInfoState>(
  initialState,
  (builder) => {
    builder.addCase(setPage, (state, action) => {
      const origin = window.location.origin;
      const page = action.payload.page;
      let url = `${origin}/${page}`;
      if (page === "profile") url += "/" + action.payload.id;
      if (page === "peopleNear" && action.payload.openedProfile)
        url += "/" + action.payload.openedProfile;
      if (page === "messages" && action.payload.openedChat)
        url += "/" + action.payload.openedChat;
      window.history.pushState({ page: action.payload.page }, "", url);

      return action.payload;
    });
  }
);
