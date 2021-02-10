import axios, { AxiosResponse } from "axios";

import { TODO_ITEM_URL } from "./../utils/constants";
import { TodoItem } from "../utils/interfaces";
import { getAuthorizationHeaders } from "./../utils/helpers";

type TodoItemPayload = Partial<TodoItem>;

const createTodoItem = async ({
  parent,
  author,
  title,
  parentType,
}: TodoItemPayload) => {
  try {
    const { data }: AxiosResponse = await axios.post(
      TODO_ITEM_URL,
      {
        parent,
        author,
        title,
        status: 0,
        parentType,
      },
      {
        headers: getAuthorizationHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const toggleTodoItemStatus = async ({ _id, status }: TodoItemPayload) => {
  try {
    const { data }: AxiosResponse = await axios.put(
      `${TODO_ITEM_URL}/${_id}`,
      {
        status,
      },
      {
        headers: getAuthorizationHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const updateTodoItemTitle = async ({ _id, title }: TodoItemPayload) => {
  try {
    const { data }: AxiosResponse = await axios.put(
      `${TODO_ITEM_URL}/${_id}`,
      {
        title,
      },
      {
        headers: getAuthorizationHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const deleteTodoItem = async ({ _id }: TodoItemPayload) => {
  try {
    const { data }: AxiosResponse = await axios.delete(
      `${TODO_ITEM_URL}/${_id}`,
      {
        headers: getAuthorizationHeaders(),
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const todoItemService = {
  createTodoItem,
  deleteTodoItem,
  updateTodoItemTitle,
  toggleTodoItemStatus,
};
