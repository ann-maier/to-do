import React from "react";

import { TodoItem } from "../../utils/interfaces";

import "./TodoItemForm.scss";

interface TodoItemFormProps {
  formLabel: string;
  isSubtaskForm?: boolean;
  item?: Partial<TodoItem>;
  onCreateTodoItem: (todoItem: any) => void;
}

export const TodoItemForm: React.FC<TodoItemFormProps> = ({
  onCreateTodoItem,
  item,
  isSubtaskForm = false,
  formLabel,
}) => {
  const [newItemTitle, setNewItemTitle] = React.useState<string>("New Item");

  const _onCreateTodoItem = () => {
    if (isSubtaskForm && item) {
      onCreateTodoItem({
        ...item,
        parent: item._id,
        parentType: 1,
        title: newItemTitle,
      });
    } else {
      onCreateTodoItem({ title: newItemTitle });
    }
  };

  return (
    <div className="todo-item-form">
      <label>
        <span>{formLabel}</span>
        <input
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setNewItemTitle(e.currentTarget.value)
          }
          value={newItemTitle}
        />
      </label>
      <button disabled={!newItemTitle} onClick={_onCreateTodoItem}>
        Add new todo item
      </button>
    </div>
  );
};
