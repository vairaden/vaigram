import { ITokenPayload } from "dtos";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import UserModel from "../models/users";

const protect = asyncHandler(async (req: Request, res: Response, next: Function) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as ITokenPayload;

      const user = await UserModel.findById(userId).select("-password");

      if (!user) throw new Error("No user found");

      req.userId = userId;

      next();
    } catch (err: any) {
      res.status(401);
    }

    if (!token) {
      res.status(401);
    }
  }
});

export default protect;
