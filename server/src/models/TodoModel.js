import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "Please enter the title"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
    require: [true, "Please enter the Description"],
  },
});

export const TodoModel = mongoose.model("Todo", TodoSchema);
