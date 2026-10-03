import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import wishRoutes from './routes/wish.routes.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
}); 

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Wedding Guestbook API is running' });
});

app.use('/api/wishes', submitLimiter, wishRoutes);

app.use(notFound);
app.use(errorHandler);
