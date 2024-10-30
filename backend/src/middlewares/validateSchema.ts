import { Request, Response, NextFunction } from 'express';
import { Schema } from 'yup';

export const validateSchema =
  (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
    schema
      .validate(req)
      .then(() => next())
      .catch((err) => res.status(400).json({ error: err.errors }));
  };
