import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { rateLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';     

import orderRoutes from "./routes/order.routes.js";
import menuRoutes from "./routes/menu.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);


// routes
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);

app.use(errorMiddleware);

export default app;
