import axios, { AxiosResponse } from "axios";

import { TODOS_URL } from "./../utils/constants";
import { getAuthorizationHeaders } from "../utils/helpers";
import { TodoResponse } from "../utils/interfaces";

interface Response extends AxiosResponse {
  data: TodoResponse[];
}

const getTodos = async () => {
  try {
    const { data }: Response = await axios.get(TODOS_URL, {
      headers: getAuthorizationHeaders(),
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const todosService = { getTodos };
