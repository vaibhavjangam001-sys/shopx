import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  errorMiddleware,
  razorpayWebhookSignatureMiddleware,
} from './middlewares/index.js';
import routes from './routes/index.js';
import { handleRazorpayWebhookController } from './controllers/payment/index.js';

// Create express app :-
const app = express();

// razorpay webhook route
app.post(
  '/api/v1/payments/webhook',
  express.raw({ type: 'application/json' }),
  razorpayWebhookSignatureMiddleware,
  handleRazorpayWebhookController
);

// Global middlewares :-
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
  cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Routers registration :-
app.use('/api', routes);

// Error middleware
app.use(errorMiddleware);

export default app;
