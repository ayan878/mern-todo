import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/TodoRoute.js";
import { TodoModel } from "./models/TodoModel.js";
import { dummyTodos } from "../data.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);

    //   add dummyTodos in mongodb
      TodoModel.insertMany(dummyTodos);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(router);
