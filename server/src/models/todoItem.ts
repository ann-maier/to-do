import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    creationDate: {
      type: Date,
    },
    status: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
    },
    parentType: {
      type: Number,
      required: true,
    },
  },
  { collection: "TodoItem", versionKey: false }
);

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

export { TodoItem };
