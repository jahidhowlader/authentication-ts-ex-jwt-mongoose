import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { requestLogger } from './app/libs/logger';
import { requestTime } from './app/middlewares/requestTime';
import rateLimiter from './app/libs/rateLimit';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFoundHandler } from './app/middlewares/notFoundHandler';
import router from './app/modules/routers';

const app: Application = express();

app.use(requestLogger); // logger
app.use(rateLimiter); // Rate Limit
app.use(requestTime) // Inject Request Time Start

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

// 404 Not Found Error Handler
app.use(notFoundHandler);
// Global Error Handler
app.use(globalErrorHandler);

export default app;
