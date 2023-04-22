import { createServer } from "http";
import { parse } from "url";
import fs from "fs";
import pafdjasfd from "path";
import express from "express";

const randomUser = (cnter = 0) => {
  return {
    id: 180213891,
    fname: "Имя",
    lname: "Фамилия",
    avatar:
      cnter % 2 == 0
        ? "https://c.wallhere.com/photos/ac/13/No_Game_No_Life_Jibril_pink_hair_anime_girls-244561.jpg!d"
        : "https://pibig.info/uploads/posts/2021-11/thumbs/1636738489_24-pibig-info-p-plamennii-vzor-shani-personazhi-anime-kras-28.jpg",
    fak: "ИКСС",
    age: 10,
    status: "ХЗ",
    about:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    interests: "аниме, аниме, аниме",
    progress: 10,
    balance: 10,
  };
};

//!  LOCALHOST 8210
const app = express();

app.use(function (req, res, next) {
  console.log("request on http://localhost:8210", req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(express.json());

app.get("/user/get", (req, res) => {
  res.send(randomUser());
});

app.get("/user/check", (req, res) => {
  res.send(true);
});

//
app.put("/user/change", (req, res) => {
  console.log(
    `| new data for user ${
      req.body.id
    } : { \n|   status: ${req.body.status.slice(
      0,
      90
    )}, \n|   about : ${req.body.about.slice(
      0,
      90
    )}, \n|   interests: ${req.body.interests.slice(0, 90)} \n| }`
  );
  res.sendStatus(200);
});

app.post("/user/register", (req, res) => {
  res.sendStatus(200);
});

// start server
app.listen(8210, () => {
  console.log("https://localhost:8210/ port listening!");
});

// ! PEOPLE NEAR (localhost 8212)
const app2 = express();

app2.use(function (req, res, next) {
  console.log("request on https://localhost:8212", req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app2.use(express.json());

app2.get("/peopleNear/get", (req, res) => {
  const FILE_PATH = "./server/stats/peopleNearGetCount.json";
  let cnter = JSON.parse(fs.readFileSync(FILE_PATH)) || 0;
  cnter++;
  setTimeout(() => {
    const user = randomUser(cnter);
    fs.writeFileSync(FILE_PATH, JSON.stringify(cnter), { flag: "w+" });
    res.send({
      id: user.id,
      avatar: user.avatar,
      fname: user.fname,
      lname: user.lname,
      fak: user.fak,
      description: "Люблю манную кашу с комочками и динозавров <3",
    });
  }, 1000);
});

app2.put("/peopleNear/like", (req, res) => {
  console.log(`| ${req.body.id} liked ${req.body.liked}`);
});
app2.put("/peopleNear/dislike", (req, res) => {
  console.log(`| ${req.body.id} disliked ${req.body.disliked}`);
});

app2.listen(8212, () => {
  console.log("https://localhost:8212/ port listening!");
});

// ! STORE (localhost:8214)
const app3 = express();

app3.use(function (req, res, next) {
  console.log("request on https://localhost:8214", req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app3.use(express.json());

app3.listen(8214, () => {
  console.log("https://localhost:8214/ port listening!");
});

// ! MISSIONS (localhost:8215)
const app4 = express();

app4.use(function (req, res, next) {
  console.log("request on https://localhost:8215", req.url);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app4.use(express.json());

app4.get("/tasks/get", (req, res) => {
  res.send({
    id: 1,
    difficulty: "легкий",
    name: "Бублик",
    age: 21,
    image:
      Math.floor() > 0.5
        ? "https://c.wallhere.com/photos/ac/13/No_Game_No_Life_Jibril_pink_hair_anime_girls-244561.jpg!d"
        : "https://pibig.info/uploads/posts/2021-11/thumbs/1636738489_24-pibig-info-p-plamennii-vzor-shani-personazhi-anime-kras-28.jpg",
    description:
      "Для кого-то “конфеты в ass”  угроза, для меня - тяжелая реальность жизни",
  });
});

app4.put("/tasks/reject", (req) => {
  console.log(`| user ${req.body.userId} rejected ${req.body.taskId}`);
});
app4.put("/tasks/accept", (req) => {
  console.log(`| user ${req.body.userId} accepted ${req.body.taskId}`);
});

app4.listen(8215, () => {
  console.log("https://localhost:8215/ port listening!");
});
