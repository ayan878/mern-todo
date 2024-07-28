import { TodoModel } from "../models/TodoModel.js";
import mongoose from "mongoose";

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is valid
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Update the Todo item
    const todo = await TodoModel.findByIdAndDelete(id);

    // Check if Todo item was found and updated
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Send a 200 OK response with the updated todo
    res.status(200).json(todo);
  } catch (error) {
    // Send a 500 Internal Server Error response with the error message
    res.status(500).json({ message: error.message });
  }
};
