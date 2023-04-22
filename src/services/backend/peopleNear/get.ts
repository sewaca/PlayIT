import { origin } from "..";

export interface GetPeopleNearResponse {
  id: number;
  avatar: string;
  name: {
    first: string;
    second: string;
  };
  faculty: string;
  description: string;
}

export function getPeopleNear(id: number): Promise<GetPeopleNearResponse> {
  return fetch(origin + "8212/peopleNear/get?id=" + id)
    .then((res) => res.json())
    .then((data) => ({
      id: data.id,
      avatar: data.avatar,
      name: {
        first: data.fname,
        second: data.lname,
      },
      faculty: data.fak,
      description: data.description,
    }));
}
