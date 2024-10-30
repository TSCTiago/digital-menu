import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/users';
import { Token } from '../models/token';
import { User } from '../models/user';

export async function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as Token;
    const user: User | null = await UserRepository.findById(payload.userId);
    return user;
  } catch {
    return null;
  }
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(403).json({
      message: 'Unauthorized',
    });

    return next();
  }

  try {
    const token = authorization.split(' ')[1];
    const user = await verifyToken(token);

    if (!user) {
      res.status(403).json({
        message: 'Unauthorized',
      });

      return next();
    }

    req.context = {
      ...req.context,
      user,
    };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: 'Token Expired',
      });
    }

    res.status(403).json({
      message: 'Unauthorized',
    });
  }

  return next();
}
