import express, { Request, Response } from "express";

import { User } from "../models/user";

const router = express.Router();

router.post("/users", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  await User.create({
    username,
    password,
  });

  return res.status(201).send();
});

export { router as userRouter };
