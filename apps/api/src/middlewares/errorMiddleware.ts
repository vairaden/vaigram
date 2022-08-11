import { NextFunction, Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    message: err.message,
  });

  next();
}

export default errorHandler;
