import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { json } from "body-parser";
import { Socket } from "socket.io";

import { authRouter } from "./routes/auth";
import { todoRouter } from "./routes/todo";
import { todoItemRouter } from "./routes/todoItem";
import { userRouter } from "./routes/user";

dotenv.config();

const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT;
const DATABASE_CONNECTION_URL = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.fhzwh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.use(json());
app.use(cors());
app.use(authRouter);
app.use(todoRouter);
app.use(todoItemRouter);
app.use(userRouter);

mongoose.connect(
  DATABASE_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected to the database");
  }
);

io.on("connection", (socket: Socket) => {
  console.log("a user connected");

  socket.on("createTodoItem", (data: any) => {
    socket.broadcast.emit("onCreateTodoItem", data);
  });
});

http.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
