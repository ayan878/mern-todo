import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny")); // Use the 'tiny' format string for logging

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Define routes
app.get("/", (req, res) => {
  res.send("Hello");
});
