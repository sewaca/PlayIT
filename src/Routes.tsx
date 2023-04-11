import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkUser } from "~/services/backend/";
import { getUserByTocken } from "~/services/VKAPI/";
import { pathToEvent, parseVKOauthCode } from "~/utils/routing/";
import {
  RegistrationModal,
  Profile,
  PeopleNear,
  Missions,
  Store as StorePage,
} from "~/pages";
import {
  PageInfoState,
  setPage,
  setUserData,
  Store,
  UserInfoState,
} from "~/store";
import Messages from "./pages/Messages/Messages";

export default function Routes(): JSX.Element | null {
  interface SelectedState {
    user: UserInfoState;
    page: PageInfoState;
  }
  const { user, page } = useSelector<Store, SelectedState>((store) => ({
    user: store.user,
    page: store.page,
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

  if (page.page === "registration")
    return (
      <>
        {(page.step || [1]).map((item) => (
          <RegistrationModal key={"registration?step=" + item} step={item} />
        ))}
      </>
    );
  if (page.page === "profile") return <Profile id={page.id || user.id || 0} />;
  if (page.page === "peopleNear")
    return (
      <>
        <PeopleNear />
        {page.openedProfile && (
          <Profile
            onClose={() => dispatch(setPage({ page: "peopleNear" }))}
            id={page.openedProfile}
          />
        )}
      </>
    );
  if (page.page === "missions") return <Missions />;
  if (page.page === "store") return <StorePage />;
  if (page.page === "messages")
    return (
      <>
        <Messages />
        {page.openedChat && <></>}
      </>
    );
  return null;
}
