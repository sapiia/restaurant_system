import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateMiddleware = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };