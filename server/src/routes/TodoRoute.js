import { Router } from "express";
import { getTodos } from "../controllers/readTodoController.js";
import { createTodo } from "../controllers/createTodoController.js";
import { updateTodo } from "../controllers/updateTodoController.js";
import { deleteTodo } from "../controllers/deleteTodoController.js";

const router = Router();

router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);



export default router;
