import { TodoModel } from "../models/TodoModel.js";

export const getTodos = async (req, res) => {
  try {
    // Fetch all Todo items from the database
    const todos = await TodoModel.find();

    // Send a 200 OK response with the list of todos
    res.status(200).json(todos);
  } catch (error) {
    // Log the error (optional)
    console.error("Error fetching todos:", error);

    // Send a 500 Internal Server Error response with the error message
    res
      .status(500)
      .json({ message: "Failed to retrieve todos", error: error.message });
  }
};
