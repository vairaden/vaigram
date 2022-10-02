import { NextFunction, Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(400).json({
    message: "Unknown route",
  });

  next();
}

export default errorHandler;
