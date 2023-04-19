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
            if (res) dispatch(setPage({ page: "profile", id: data.id }));
            else dispatch(setPage({ page: "registration", step: [1, 2] }));
          });
        })
        // TODO: should catch it
        .catch((e) => dispatch(setPage({ page: "registration", step: [1] })));
      return;
    }
    if (!user.id) {
      dispatch(setPage({ page: "registration", step: [1] }));
      return;
    }
    checkUser(user.id)
      .then((res) => {
        if (res) dispatch(setPage(pathToEvent()));
        else dispatch(setPage({ page: "registration", step: [1, 2] }));
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
