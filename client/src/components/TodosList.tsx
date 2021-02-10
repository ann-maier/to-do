import React from "react";

import { todosService } from "../services/todo";
import { formatDateToLocale } from "../utils/helpers";
import { TodoResponse, TodoStatus } from "../utils/interfaces";
import { NEW_TODO_ITEM_NOTIFICATION_TEXT } from "../utils/constants";
import { useSocket } from "../hooks/useSocket";

import { TodoItemsList } from "./TodoItemsList";
import { Notification } from "./Notification/Notification";

const TodosListBase: React.FC = () => {
  const socket = useSocket();
  const [todosList, setTodosList] = React.useState<TodoResponse[]>([]);
  const [
    createTodoItemNotificationMessage,
    setCreateTodoItemNotificationMessage,
  ] = React.useState<string>("");

  const fetchTodosList = async () => {
    const todos = await todosService.getTodos();
    setTodosList(todos);
    setTimeout(() => {
      setCreateTodoItemNotificationMessage("");
    }, 5000);
  };

  React.useEffect(() => {
    fetchTodosList();
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket?.on("onCreateTodoItem", (title: any) => {
        setCreateTodoItemNotificationMessage(
          `${NEW_TODO_ITEM_NOTIFICATION_TEXT}: ${title}`
        );
        fetchTodosList();
      });
    }
  }, [socket]);

  return (
    socket && (
      <div>
        {createTodoItemNotificationMessage && (
          <Notification message={createTodoItemNotificationMessage} />
        )}
        <ol>
          {todosList.map(
            ({ todo: { _id, title, creationDate, status }, items }) => (
              <li key={_id}>
                <h3
                  style={{
                    fontWeight: "bold",
                    textDecoration:
                      Number(status) === TodoStatus.Done
                        ? "line-through"
                        : "none",
                  }}
                >
                  Todo name: {title} ({formatDateToLocale(creationDate)})
                </h3>
                <TodoItemsList
                  items={items}
                  parent={_id}
                  fetchTodosList={fetchTodosList}
                />
              </li>
            )
          )}
        </ol>
      </div>
    )
  );
};

export const TodosList = React.memo(TodosListBase);
