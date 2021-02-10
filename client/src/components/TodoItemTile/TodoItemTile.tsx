import React from "react";

import { todoItemService } from "../../services/todoItem";
import { TodoItem, TodoItemStatus } from "../../utils/interfaces";
import { TodoItemForm } from "../TodoItemForm/TodoItemForm";
import { getAuthorID } from "../../utils/helpers";

import "./TodoItemTile.scss";

interface TodoItemTileProps {
  item: TodoItem;
  isSubtask?: boolean;
  fetchTodosList: () => Promise<void>;
}

export const TodoItemTile: React.FC<TodoItemTileProps> = ({
  item,
  fetchTodosList,
  isSubtask = false,
}) => {
  const { _id, title, status, items } = item;
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [isCreateSubtaskMode, setIsCreateSubtaskMode] = React.useState<boolean>(
    false
  );
  const [newItemTitle, setNewItemTitle] = React.useState<string>(title);

  const onNewItemTitleChange = (e: React.FormEvent<HTMLInputElement>) =>
    setNewItemTitle(e.currentTarget.value);

  const onStatusChange = () => {
    const newStatus =
      status === TodoItemStatus.Done
        ? TodoItemStatus.NotDone
        : TodoItemStatus.Done;
    todoItemService.toggleTodoItemStatus({ _id, status: newStatus });
    fetchTodosList();
  };

  const onTitleChange = () => {
    todoItemService.updateTodoItemTitle({
      _id,
      title: newItemTitle,
    });
    fetchTodosList();
    setIsEditMode(!isEditMode);
  };

  const onDelete = () => {
    todoItemService.deleteTodoItem({ _id });
    fetchTodosList();
  };

  const onCreateTodoItem = (todoItem: TodoItem) => {
    todoItemService.createTodoItem({
      parent: todoItem.parent,
      author: getAuthorID(),
      title: todoItem.title,
      parentType: todoItem.parentType,
    });

    fetchTodosList();
  };

  return (
    <div className="todo-item-tile">
      <label>
        <input
          type="checkbox"
          checked={status === TodoItemStatus.Done}
          onChange={onStatusChange}
        />
        <span className="item-title">{title}</span>
      </label>

      {isEditMode && (
        <div className="todo-item-edit-form">
          <span>Title: </span>
          <input
            type="text"
            onChange={onNewItemTitleChange}
            value={newItemTitle}
          />
          <button disabled={!newItemTitle} onClick={onTitleChange}>
            Update todo item
          </button>
        </div>
      )}

      <div className="action-buttons">
        <button
          className="action-button edit-button"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          <i className="fas fa-edit"></i>
        </button>

        {!isSubtask ? (
          <button
            className="action-button add-button"
            onClick={() => setIsCreateSubtaskMode(!isCreateSubtaskMode)}
          >
            {isCreateSubtaskMode ? (
              <i className="fas fa-minus"></i>
            ) : (
              <i className="fas fa-plus"></i>
            )}
          </button>
        ) : null}

        <button className="action-button remove-button" onClick={onDelete}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      {items?.length > 0 && (
        <div className="subtasks-container">
          {items.map((item, index) => (
            <TodoItemTile
              key={index}
              isSubtask={true}
              item={item}
              fetchTodosList={fetchTodosList}
            />
          ))}
        </div>
      )}

      {!isSubtask && isCreateSubtaskMode && (
        <TodoItemForm
          isSubtaskForm={true}
          formLabel={"Create subtask"}
          onCreateTodoItem={onCreateTodoItem}
          item={item}
        />
      )}
    </div>
  );
};
