import { origin } from "..";

interface ChangeUserProps {
  id: number;
  aboutme?: string;
  status?: string;
  interests?: string;
}

export const changeUser = (params: ChangeUserProps) =>
  fetch(origin + "8210/user/change", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: params.id,
      status: params.status || "",
      about: params.aboutme || "",
      interests: params.interests || "",
    }),
  });
