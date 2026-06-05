import dotenv from "dotenv";
import "reflect-metadata";
import app from "./app.js";
import { AppDataSource } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message); // ← shows exact error
    process.exit(1); // ← tells Render it failed instead of hanging
  });