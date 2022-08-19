import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import UserModel from "../models/users";

const protect = asyncHandler(async (req: Request, res: Response, next: Function) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
      throw new Error("No authorization header");

    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("No access token");

    const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { userId: string };

    const user = await UserModel.findById(userId).select("-password");
    if (!user) throw new Error("No user found");

    req.userId = userId;

    next();
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default protect;
