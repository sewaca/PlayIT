import { origin } from "..";

interface ChangeUserProps {
  id: number;
  name?: {
    first?: string;
    second?: string;
  };
  avatar?: string;
  faculty?: string;
  age?: number;
  aboutme?: string;
  status?: string;
  interests?: string;
}

export const changeUser = (params: ChangeUserProps) =>
  fetch(origin + "user/change", {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: params.id,
      status: params.status || "",
      about: params.aboutme || "",
      interests: params.interests || "",
    }),
  });
