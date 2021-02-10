import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { AUTH_ERROR_MESSAGE, AUTH_SUCCESS_MESSAGE } from "../utils/constants";

import { Notification } from "./Notification/Notification";

export const SignInForm: React.FC = () => {
  const history = useHistory();
  const { isAuthenticated, isLoading, login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  React.useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }

    return () => {
      setUsername("");
      setPassword("");
      setErrorMessage("");
      setSuccessMessage("");
    };
  }, [history, isAuthenticated]);

  const onUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(username, password);
      setSuccessMessage(`${AUTH_SUCCESS_MESSAGE}, ${username}`);
      setErrorMessage("");
    } catch {
      setErrorMessage(AUTH_ERROR_MESSAGE);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      {errorMessage && <Notification message={errorMessage} />}
      {successMessage && <Notification message={successMessage} />}
      <form onSubmit={onSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={onUsernameChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            autoComplete="off"
            onChange={onPasswordChange}
          />
        </label>
        <input type="submit" value="Sign in" />
      </form>
    </>
  );
};
