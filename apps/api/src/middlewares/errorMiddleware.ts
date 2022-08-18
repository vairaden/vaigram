import { Request, Response } from "express";

function errorHandler(err: Error, req: Request, res: Response) {
  res.status(400).json({
    message: "Unknown route",
  });
}

export default errorHandler;
