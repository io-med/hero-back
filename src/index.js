import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { heroRouter } from './routes/hero.route.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { delayMiddleWare } from './middlewares/delayMiddleware.js';
import { imageRouter } from './routes/image.route.js';

const PORT = process.env.PORT || 3007;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
  }),
);

app.use('/images', imageRouter);
app.use(delayMiddleWare);
app.use('/heroes', heroRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
