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
  fetch(origin + "8210/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: data.id,
      fname: data.name.first,
      lname: data.name.second,
      // TODO: Сделать аватар
      avatar: "", // URL
      fak: data.faculty,
      age: data.age,
      status: data.status,
      about: data.aboutme,
      interests: data.interests,
    }),
  }).then(() => localStorage.setItem("userId", data.id.toString()));
