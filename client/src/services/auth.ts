import axios, { AxiosResponse } from "axios";

import {
  AUTH_LOGIN_URL,
  AUTH_TOKEN_KEY,
  AUTH_USER_ID,
} from "../utils/constants";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";

interface Response extends AxiosResponse {
  data: {
    userID: string;
    token: string;
  };
}

const login = async (username: string, password: string) => {
  try {
    const { data }: Response = await axios.post(AUTH_LOGIN_URL, {
      username,
      password,
    });
    setLocalStorageItem(AUTH_TOKEN_KEY, data.token);
    setLocalStorageItem(AUTH_USER_ID, data.userID);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

const logout = () => {
  removeLocalStorageItem(AUTH_TOKEN_KEY);
  removeLocalStorageItem(AUTH_USER_ID);
};

export const authService = { login, logout };
