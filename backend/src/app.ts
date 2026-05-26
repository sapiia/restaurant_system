import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { rateLimiter } from './middlewares/rateLimiter.middleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';     

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

export default app;