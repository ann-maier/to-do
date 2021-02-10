import React from "react";

import { TodosList } from "./TodosList";

export const TodosLayout: React.FC = () => {
  return (
    <div className="container">
      <TodosList />
    </div>
  );
};
