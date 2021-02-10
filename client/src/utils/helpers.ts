import { TodoItem, TodoStatus } from "./interfaces";
import { AUTH_TOKEN_KEY, AUTH_USER_ID } from "./constants";
import { getLocalStorageItem } from "./localStorage";

export const getAuthorizationHeaders = () => {
  const token = getLocalStorageItem(AUTH_TOKEN_KEY);

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
};

export const formatDateToLocale = (date: Date) =>
  new Date(date).toLocaleDateString();

export const getAuthorID = () => getLocalStorageItem(AUTH_USER_ID) ?? "";

export const todoItemFilters = {
  all: (todoItems: TodoItem[]) => todoItems,
  done: (todoItems: TodoItem[]) =>
    todoItems.filter(({ status }) => Number(status) === TodoStatus.Done),
};
