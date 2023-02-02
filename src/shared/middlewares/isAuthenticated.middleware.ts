import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../../config/authConfig';
import { AppError } from '../errors/AppError';

export const isAuthenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('No token finded');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(
      token,
      authConfig.jwt.secret as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new AppError('Invalid token', 401);
        }
        req.user = {
          id: decoded.id,
          email: decoded.email,
        };
        next();
      },
    );
  } catch (error) {
    throw new AppError('Invalid Token');
  }
};
