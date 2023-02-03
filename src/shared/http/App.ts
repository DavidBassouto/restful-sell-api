import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import { routes } from './routes';
import { AppError } from '../errors/AppError';
import { errors } from 'celebrate';
import '../typeorm/data-source';

export const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

app.use(
  (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });

    next();
  },
);
