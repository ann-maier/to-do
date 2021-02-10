import express, { Request, Response } from "express";

import { Todo } from "../models/todo";
import { authenticateToken } from "../middlewares/auth";
import { TodoItem } from "../models/todoItem";

const router = express.Router();

const populateTodoItems = (todo: any, todoItems: any) => {
  const result = [];

  for (let item of todoItems) {
    const _item = { ...item._doc, items: [] };

    _item.items = todoItems.filter(
      (todoItem: { parentType: number; parent: string }) =>
        todoItem.parentType === 1 &&
        todoItem.parent.toString() === item._id.toString()
    );

    if (
      item.parentType === 0 &&
      todo._id.toString() === item.parent.toString()
    ) {
      result.push(_item);
    }

    populateTodoItems(todo, _item.items);
  }

  return result;
};

const getTodoResponse = (todos: any, todoItems: any) =>
  todos.map((todo: any) => ({
    todo,
    items: populateTodoItems(todo, todoItems),
  }));

router.get("/todos", authenticateToken, async (req: Request, res: Response) => {
  const todos = await Todo.find({});
  const todoItems = await TodoItem.find({});

  const todoResponse = getTodoResponse(todos, todoItems);

  return res.status(200).send(todoResponse);
});

router.get(
  "/todos/:id",
  authenticateToken,
  async (req: Request, res: Response) => {
    const todo = await Todo.findById(req.params.id).populate(
      "author",
      "username"
    );
    const todoItems = await TodoItem.find({});

    const todoResponse = getTodoResponse([todo], todoItems);

    return res.status(200).send(todoResponse);
  }
);

export { router as todoRouter };
