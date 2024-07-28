import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
