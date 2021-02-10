import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { AUTH_LOGIN_URL } from "../utils/constants";

export const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_LOGIN_URL,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
