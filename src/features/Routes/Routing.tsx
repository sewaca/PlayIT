import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserByTocken } from "~/services/VKAPI";
import { checkUser } from "~/services/backend";
import {
  UserInfoState,
  setUserData,
  setPage,
  Store,
  OpenedPagesInfo,
} from "~/store";
import { parseVKOauthCode, pathToEvent } from "~/utils/routing";
import DisplayRoute from "./DisplayRoute";

interface RoutingProps {}

export default function Routes({}: RoutingProps) {
  interface SelectedState {
    user: UserInfoState;
    pages: OpenedPagesInfo;
  }
  const { user, pages } = useSelector<Store, SelectedState>((store) => ({
    user: store.user,
    pages: store.page,
  }));
  const dispatch = useDispatch();

  // Route first view
  useEffect(() => {
    const code = parseVKOauthCode();
    if (code) {
      getUserByTocken(code)
        .then((data) => {
          dispatch(setUserData(data));
          checkUser(data.id).then((res) => {
            if (res) {
              localStorage.setItem("userId", data.id.toString());
              dispatch(setPage({ page: "profile", id: data.id }));
            } else {
              localStorage.setItem("userId", "");
              dispatch(setPage({ page: "registration", step: [1, 2] }));
            }
          });
        })
        // TODO: should catch it
        .catch((e) => dispatch(setPage({ page: "registration", step: [1] })));
      return;
    }
    if (!user.id) {
      localStorage.setItem("userId", "");
      dispatch(setPage({ page: "registration", step: [1] }));
      return;
    }
    checkUser(user.id)
      .then((res) => {
        if (res) {
          localStorage.setItem("userId", (user.id || 0).toString());
          dispatch(setPage(pathToEvent()));
        } else {
          localStorage.setItem("userId", "");
          dispatch(setPage({ page: "registration", step: [1] }));
        }
      })
      .catch(() => dispatch(setPage({ page: "registration", step: [1] })));
  }, []);

  return (
    <>
      {pages.page.map((pageName) => (
        <DisplayRoute
          key={pageName}
          page={{ ...pages, page: pageName }}
          userId={user.id || 0}
        />
      ))}
    </>
  );
}
