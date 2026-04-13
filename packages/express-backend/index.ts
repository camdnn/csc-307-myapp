// backend.ts
//

import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { stringify } from "querystring";

const app = express();
const PORT = 8000;

app.use(cors());
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

// =========== READ Operations
const findUserById = (id: string) => {
  return users.users_list.find((user) => user["id"] === id);
};

app.get("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found");
  } else {
    res.send({ users_list: result });
  }
});

const findUserByName = (name: string) => {
  return users.users_list.filter((user) => user.name === name);
};

const findUserByJob = (job: string) => {
  return users.users_list.filter((user) => user.job === job);
};

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const job = req.query.job as string;

  if (name != undefined && job != undefined) {
    const result = users.users_list.filter((user) => {
      if (user.name === name && user.job === job) return user;
    });

    res.send({ users_list: result });
  } else if (job != undefined) {
    const result = findUserByJob(job);
    res.send({ users_list: result });
  } else if (name != undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

// ============= CREATE Operations
interface User {
  id: string;
  name: string;
  job: string;
}

const generateId = (max: number): string => {
  return Math.floor(Math.random() * max).toString();
};

const addUser = (user: User) => {
  user.id = generateId(10000);
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req: Request, res: Response) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).send(newUser);
});

// ============ DELETE Operations

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  users.users_list = users.users_list.filter((user) => user.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/users`);
});
