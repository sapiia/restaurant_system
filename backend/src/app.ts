import express from "express";
import cors from "cors";

import orderRoutes from "./routes/order.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Order routes
app.use("/api/orders", orderRoutes);

export default app;