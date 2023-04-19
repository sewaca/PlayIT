import { origin } from "..";

interface RegisterUserProps {
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
}

export const registerUser = (data: RegisterUserProps) =>
  fetch(origin + "user/register", {
    method: "POST",
    body: JSON.stringify({
      id: data.id,
      fname: data.name.first,
      lname: data.name.second,
      avatar: "", // URL
      fak: data.faculty,
      age: data.age,
      status: data.status,
      about: data.aboutme,
      interests: data.interests,
    }),
  });
