export enum TodoStatus {
  NotDone,
  Done,
  Frozen,
}

export enum TodoItemStatus {
  NotDone,
  Done,
}

export interface User {
  _id: string;
  username: string;
  password: string;
}

export interface Todo {
  _id: string;
  author: string;
  title: string;
  creationDate: Date;
  status: TodoStatus;
}

export interface TodoItem {
  _id: string;
  parent: string;
  author: string;
  title: string;
  creationDate: Date;
  status: TodoItemStatus;
  parentType: number;
  items: TodoItem[];
  price?: string;
}

export interface TodoResponse {
  todo: Todo;
  items: TodoItem[];
}

export enum TodoParentTypes {
  Todo,
  TodoItem,
}
