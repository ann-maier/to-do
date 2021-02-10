import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { LoginLayout } from "./components/LoginLayout";
import { TodosLayout } from "./components/TodosLayout";
import { Auth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import "./App.scss";

function App() {
  return (
    <Router>
      <Auth>
        <Switch>
          <ProtectedRoute exact path="/">
            <TodosLayout />
          </ProtectedRoute>
          <Route path="/login" component={LoginLayout} />
        </Switch>
      </Auth>
    </Router>
  );
}

export default App;
