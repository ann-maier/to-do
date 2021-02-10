import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "User", versionKey: false }
);

const User = mongoose.model("User", userSchema);

export { User };
