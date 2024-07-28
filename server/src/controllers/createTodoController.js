import { TodoModel } from "../models/TodoModel.js";


export const createTodo = async (req, res) => {
  try {
    // Extract title and completed status from the request body
    const { title, completed = false } = req.body;

    // Validate title
    if (!title || typeof title !== "string" || title.trim() === "") {
      return res
        .status(400)
        .send({ message: "Title is required and must be a non-empty string." });
    }

    // Create a new Todo item
    const todo = await TodoModel.create({
      title,
      completed,
    });

    // Send a 201 Created response with the new todo item
    res.status(201).json(todo);
  } catch (error) {
    // Send a 500 Internal Server Error response with the error message
    res.status(500).send({ message: error.message });
  }
};
