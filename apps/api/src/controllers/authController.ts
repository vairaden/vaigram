import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import { LoginUserRequest } from "dtos";
import TokenModel from "../models/tokens";
import tokenService from "../services/tokenService";
import UserModel from "../models/users";

require("dotenv").config({ path: path.join(__dirname, ".", ".env") });

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as LoginUserRequest;

    const user = await UserModel.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = tokenService.generateTokens({ userId: user.id });
    await tokenService.storeRefreshToken(user.id, refreshToken);

    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
      })
      .json({
        id: user.id,
        username,
        accessToken,
      });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { cookies, userId } = req;

    if (!cookies.refreshToken) throw new Error("No cookies");

    await tokenService.deleteRefreshToken(userId!);

    res
      .status(200)
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ message: "User logged out" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const handleRefreshToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { cookies } = req;

    if (!cookies.refreshToken) throw new Error("No cookies");
    const { refreshToken } = cookies;

    const data = await TokenModel.findOne({ refreshToken });

    if (data === null) throw new Error("No user with such cookie");

    const userData = await UserModel.findById(data.userId);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err: any, payload: any) => {
      if (err || data.userId.toString() !== payload.userId)
        return res.status(401).json({ message: "Token not verified" });

      const newTokens = tokenService.generateTokens({ userId: payload.userId.toString() });
      await tokenService.storeRefreshToken(payload.userId.toString(), newTokens.refreshToken);

      return res
        .status(201)
        .cookie("refreshToken", newTokens.refreshToken, {
          httpOnly: true,
        })
        .json({
          userData,
          accessToken: newTokens.accessToken,
        });
    });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default { handleRefreshToken, loginUser, logoutUser };