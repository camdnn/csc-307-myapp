// backend.ts
//

import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import User from "./users.ts"
import mongoose from "mongoose"

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/users")


// =========== READ Operations
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      res.status(404).send("Resource not found");
    } else {
      res.json(result);
    }
  } catch (e) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const { name, job } = req.query as { name?: string; job?: string };
    const filter: Record<string, string> = {};
    if (name) filter.name = name;
    if (job) filter.job = job;
    const users = await User.find(filter);
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// ============= CREATE Operations
interface User {
  id: string;
  name: string;
  job: string;
}

app.post("/users", async (req: Request, res: Response) => {
  try {
    const userToAdd = new User(req.body);
    const saved = await userToAdd.save();
    res.status(201).json(saved);
  } catch (e) {
    res.status(500).json({ error: "Failed to add a user" });
  }
});

// ============ DELETE Operations

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Successfully deleted user" });
    } else {
      res.status(404).json({ message: "User not found" });
    }

  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}/users`);
});
