import { origin } from "./index";

export const getUserByTocken = (tocken: string) =>
  fetch(origin + "/method/users.get?access_token=" + tocken + "&v=5.131")
    .then((res) => res.json())
    .then((data) => ({
      id: data.response[0].id as number,
      name: {
        first: data.response[0].first_name as string,
        last: data.response[0].last_name as string,
      },
    }));
