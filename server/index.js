import { createServer } from "http";
import { parse } from "url";
import fs from "fs";
import pafdjasfd from "path";

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

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const path = parse(req.url, true).pathname;
  console.log("request on", path);

  if (path === "/user/get") {
    setTimeout(() => {
      res.writeHead(200);
      res.end(JSON.stringify(randomUser()));
    }, 1000);
    return true;
  }

  if (path === "/user/check") {
    setTimeout(() => {
      res.writeHead(200);
      res.end(JSON.stringify(true));
    }, 1000);
    return true;
  }

  if (path === "/peopleNear/get") {
    const FILE_PATH = "./server/stats/peopleNearGetCount.json";
    let cnter = JSON.parse(fs.readFileSync(FILE_PATH)) || 0;
    cnter++;
    setTimeout(() => {
      const user = randomUser(cnter);
      fs.writeFileSync(FILE_PATH, JSON.stringify(cnter), { flag: "w+" });
      res.writeHead(200);
      res.end(
        JSON.stringify({
          id: user.id,
          avatar: user.avatar,
          fname: user.fname,
          lname: user.lname,
          fak: user.fak,
          description: "Люблю манную кашу с комочками и динозавров <3",
        })
      );
    }, 1000);
    return true;
  }

  if (path === "/peopleNear/like") {
    let body = "";
    req.on("data", function (data) {
      body += data;
    });
    req.on("end", function () {
      const data = JSON.parse(body);
      console.log(`| ${data.id} liked ${data.liked}`);
    });
    // console.log(body);
    res.writeHead(200);
    return true;
  }

  if (path === "/tasks/get") {
    const FILE_PATH = "./server/stats/peopleNearGetCount.json";
    let cnter = JSON.parse(fs.readFileSync(FILE_PATH)) || 0;
    cnter++;
    fs.writeFileSync(FILE_PATH, JSON.stringify(cnter), { flag: "w+" });

    res.writeHead(200);
    res.end(
      JSON.stringify({
        id: 1,
        difficulty: "легкий",
        name: "Бублик",
        age: 21,
        image:
          cnter % 2 == 0
            ? "https://c.wallhere.com/photos/ac/13/No_Game_No_Life_Jibril_pink_hair_anime_girls-244561.jpg!d"
            : "https://pibig.info/uploads/posts/2021-11/thumbs/1636738489_24-pibig-info-p-plamennii-vzor-shani-personazhi-anime-kras-28.jpg",
        description:
          "Для кого-то “конфеты в ass”  угроза, для меня - тяжелая реальность жизни",
      })
    );
    return true;
  }

  // ! 404 response
  console.log("^ server fell down here...");
  res.writeHead(404);
  res.end(JSON.stringify({ error: "Resource not found" }));
};

const server = createServer(requestListener);
server.listen(821);
