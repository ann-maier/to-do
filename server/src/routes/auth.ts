import jwt, { Secret } from "jsonwebtoken";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

import { User } from "../models/user";

dotenv.config();

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (username === user.username && password === user.password) {
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        {
          expiresIn: "100000000s",
        }
      );

      return res.status(200).send({ token, userID: user._id });
    } else {
      throw new Error("unauthorized");
    }
  } catch {
    return res.status(403).send();
  }
});

export { router as authRouter };
