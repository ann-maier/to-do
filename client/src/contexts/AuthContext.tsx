import React from "react";

import { authService } from "../services/auth";
import { AUTH_TOKEN_KEY } from "../utils/constants";
import { getLocalStorageItem } from "../utils/localStorage";

interface AuthContextInterface {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => "",
  logout: () => undefined,
});

export const Auth: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = getLocalStorageItem(AUTH_TOKEN_KEY);

    if (token) {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await authService.login(username, password);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setIsLoading(false);

      throw new Error(error);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
