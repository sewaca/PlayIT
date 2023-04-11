import { origin } from "..";

export interface GetUserResponse {
  id: number;
  name: {
    first: string;
    second: string;
  };
  avatar: string;
  faculty: string;
  age: number;
  aboutme: string;
  status: string;
  interests: string;
  progress: number;
  balance: number;
}

export const getUser = (id: number) =>
  fetch(origin + "user/get?id=" + id)
    .then((res) => res.json())
    .then(
      (data) =>
        ({
          id: data.id,
          name: {
            first: data.fname,
            second: data.lname,
          },
          avatar: data.avatar,
          faculty: data.fak,
          age: data.age,
          aboutme: data.about,
          status: data.status,
          interests: data.interests,
          progress: data.progress,
          balance: data.balance,
        } as GetUserResponse)
    );
