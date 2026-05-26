import dotenv from "dotenv";
import app from "./app.js";
import { AppDataSource } from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed");
    console.error(error);
  });