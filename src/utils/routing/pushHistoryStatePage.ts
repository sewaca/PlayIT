interface PushHistoryStatePageProps {
  page: string;
  payload: any;
}

export const pushHistoryStatePage = function ({
  page,
  payload,
}: PushHistoryStatePageProps) {
  const origin = window.location.origin;
  let url = `${origin}/${page}`;
  if (page === "profile") url += "/" + payload.id;
  if (page === "peopleNear" && payload.openedProfile)
    url += "/" + payload.openedProfile;
  if (page === "messages" && payload.openedChat)
    url += "/" + payload.openedChat;
  window.history.pushState({ page }, "", url);
};
