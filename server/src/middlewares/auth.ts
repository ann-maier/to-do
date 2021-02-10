import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as Secret,
    (error, decoded: { [key: string]: any } | undefined) => {
      if (error) {
        return res.status(403).send({ error });
      }

      if (decoded && decoded.id) {
        res.locals.userId = decoded.id;
      }

      next();
    }
  );
};
