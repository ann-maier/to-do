import React from "react";

import { todoItemService } from "../services/todoItem";
import {
  SHOW_ALL_TODO_ITEMS_TEXT,
  SHOW_COMPLETED_TODO_ITEMS_TEXT,
} from "../utils/constants";
import { getAuthorID, todoItemFilters } from "../utils/helpers";
import { TodoItem, TodoItemStatus, TodoParentTypes } from "../utils/interfaces";
import { useSocket } from "../hooks/useSocket";

import { TodoItemForm } from "./TodoItemForm/TodoItemForm";
import { TodoItemTile } from "./TodoItemTile/TodoItemTile";

interface CurrentFilter {
  filterName: TodoItemStatus;
  filterFunc: (items: TodoItem[]) => TodoItem[];
}

interface TodoItemsListProps {
  items: TodoItem[];
  parent: string;
  fetchTodosList: () => Promise<void>;
}

const TodoItemsListBase: React.FC<TodoItemsListProps> = ({
  items,
  parent,
  fetchTodosList,
}) => {
  const socket = useSocket();
  const [currentFilter, setCurrentFilter] = React.useState<CurrentFilter>({
    filterName: TodoItemStatus.NotDone,
    filterFunc: todoItemFilters.all,
  });

  const getAllTodoItems = () =>
    setCurrentFilter({
      filterName: TodoItemStatus.NotDone,
      filterFunc: todoItemFilters.all,
    });

  const getCompletedTodoItems = () =>
    setCurrentFilter({
      filterName: TodoItemStatus.Done,
      filterFunc: todoItemFilters.done,
    });

  const onCreateTodoItem = (todoItem: TodoItem) => {
    todoItemService.createTodoItem({
      parent,
      author: getAuthorID(),
      title: todoItem.title,
      parentType: TodoParentTypes.Todo,
    });

    socket?.emit("createTodoItem", todoItem.title);
    fetchTodosList();
  };

  return (
    <div>
      <button
        onClick={() =>
          currentFilter.filterName === TodoItemStatus.NotDone
            ? getCompletedTodoItems()
            : getAllTodoItems()
        }
      >
        {currentFilter.filterName === TodoItemStatus.NotDone
          ? SHOW_COMPLETED_TODO_ITEMS_TEXT
          : SHOW_ALL_TODO_ITEMS_TEXT}
      </button>
      <ul style={{ listStyle: "none" }}>
        {currentFilter.filterFunc(items).map((item, index) => (
          <TodoItemTile
            key={index}
            item={item}
            fetchTodosList={fetchTodosList}
          />
        ))}
      </ul>
      <TodoItemForm
        formLabel="Create Todo Item"
        onCreateTodoItem={onCreateTodoItem}
      />
    </div>
  );
};

export const TodoItemsList = React.memo(TodoItemsListBase);
