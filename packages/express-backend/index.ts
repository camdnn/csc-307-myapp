// backend.ts
//

import express from "express";
import type { Request, Response } from "express";
import type { ParsedUrlQuery } from "querystring";

const app = express();
const PORT = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name: string) => {
  return users["users_list"].filter((user) => user["name"] == name);
};

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name as string;
  if (name != undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/users`);
});
