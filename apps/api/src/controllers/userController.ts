import { LoginUserRequest, RegisterUserRequest } from "dtos/dtos";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import UserModel from "../models/users";
import tokenService from "../services/tokenService";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, email, password } = req.body as RegisterUserRequest;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

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

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) throw new Error("User not found");

    res.status(200).json({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      following: user.following,
      createdAt: user.createdAt,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const followUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);
    const othUser = await UserModel.findById(req.query.othUserId);

    if (!user || !othUser) throw new Error("User not found");
    if (user.following.includes(othUser.id)) throw new Error("Following already");

    await UserModel.findByIdAndUpdate(user.id, { following: [...user.following, othUser] });

    res.status(200).json({ message: `${user.username} is following ${othUser.username} now` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const unfollowUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.userId);
    const othUser = await UserModel.findById(req.query.othUserId);

    if (user === null || othUser === null) throw new Error("User not found");
    if (!user.following.includes(othUser.id)) throw new Error("Not following yet");

    await UserModel.findByIdAndUpdate(user.id, {
      following: user.following.filter((value) => value.toString() !== othUser.id),
    });

    res.status(200).json({ message: `${user.username} is not following ${othUser.username} now` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.userId);

    if (!user) throw new Error("User not found");

    await tokenService.deleteRefreshToken(user.id);

    res
      .status(200)
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ message: "User deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  followUser,
  unfollowUser,
  deleteUser,
};
