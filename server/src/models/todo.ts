import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { collection: "Todo", versionKey: false }
);

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
