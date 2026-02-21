import express, { json, urlencoded } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorMiddleware from './middlewares/error.middleware.js';

import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FleetFlow API is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use(errorMiddleware);

export default app;