// ~ REACT
import { useContext, lazy, Suspense } from "react";
import { OpenPageContext } from "~/context";
// ~ REDUX
import { useDispatch } from "react-redux";
import { PageInfoState, setPage } from "~/store";
// ~ PAGES
const RegistrationModal = lazy(() => import("~/pages/RegistrationModal"));
const Profile = lazy(() => import("~/pages/Profile"));
const PeopleNear = lazy(() => import("~/pages/PeopleNear"));
const Missions = lazy(() => import("~/pages/Missions"));
const StorePage = lazy(() => import("~/pages/Store"));
const Messages = lazy(() => import("~/pages/Messages"));

interface DisplayRouteProps {
  userId: number;
  page: PageInfoState;
}

export default function DisplayRoute({ page, userId }: DisplayRouteProps) {
  const openPage = useContext(OpenPageContext);

  return (
    <Suspense fallback={<></>}>
      {page.page === "registration" ? (
        (page.step || [1]).map((item) => (
          <RegistrationModal key={"registration?step=" + item} step={item} />
        ))
      ) : page.page === "profile" ? (
        <Profile id={page.id || userId || 0} />
      ) : page.page === "peopleNear" ? (
        <PeopleNear />
      ) : page.page === "missions" ? (
        <Missions />
      ) : page.page === "store" ? (
        <StorePage />
      ) : page.page === "messages" ? (
        <>
          <Messages />
          {page.openedChat && <></>}
        </>
      ) : null}
    </Suspense>
  );
}
