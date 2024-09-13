import express = require('express');
import * as mongoose from 'mongoose';
import cors = require('cors');
import helmet = require('helmet');
import rateLimit = require('express-rate-limit');
import morgan = require('morgan');
import * as dotenv from 'dotenv';
import assetRoutes from './routes/assetRoutes';
import tradeRoutes from './routes/tradeRoutes';

dotenv.config();

const app = express(); // Removed type annotation for Express

// Middleware
app.use(cors());
//app.use(helmet()); // Ensure helmet is correctly imported and used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
const limiter = rateLimit.default({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/assets', assetRoutes);
app.use('/api/trades', tradeRoutes);

// Health check route
app.get('/health', (_req: express.Request, res: express.Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// 404 Not Found handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handling middleware
app.use((err: unknown, _req: express.Request, res: express.Response) => {
  console.error(err instanceof Error ? err.stack : err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Database connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kiichain_asset_platform';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed through app termination');
  process.exit(0);
});

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;