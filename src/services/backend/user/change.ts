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
    body: JSON.stringify({
      id: params.id,
      fname: params.name?.first || null,
      lname: params.name?.second || null,
      avatar: params.avatar || null,
      fak: params.faculty || null,
      age: params.age || null,
      status: params.status || null,
      about: params.aboutme || null,
      interests: params.interests || null,
    }),
  });
