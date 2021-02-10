import express, { Request, Response } from "express";

import { TodoItem } from "../models/todoItem";
import { authenticateToken } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/todo-item",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { parent, author, title, status, parentType } = req.body;

    try {
      const todoItem = await TodoItem.create({
        parent,
        author,
        title,
        creationDate: new Date(),
        status,
        parentType,
      });
      return res.status(201).send({ todoItem });
    } catch {
      return res.status(400).send();
    }
  }
);

router.put(
  "/todo-item/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { title, status } = req.body;

    const data: { title?: string; status?: string } = {};
    if (title) {
      data.title = title;
    }
    if (status !== undefined) {
      data.status = status;
    }

    try {
      const todoItem = await TodoItem.findByIdAndUpdate(_id, { ...data });
      return res.status(200).send({ todoItem });
    } catch {
      return res.status(400).send();
    }
  }
);

router.delete(
  "/todo-item/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const _id = req.params.id;

    try {
      const todoItem = await TodoItem.findByIdAndRemove({
        _id,
      });
      return res.status(200).send({ todoItem });
    } catch (error) {
      console.log(error);
      return res.status(400).send();
    }
  }
);

export { router as todoItemRouter };
