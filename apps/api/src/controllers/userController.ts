import path from "path";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UploadedFile } from "express-fileupload";
import PostModel from "../models/posts";

import UserModel from "../models/users";
import tokenService from "../services/tokenService";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

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
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        id: user.id,
        profilePicture: user.profilePicture,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        accessToken,
      });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const getProfile = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.userId);

    if (!user) throw new Error("User not found");

    res.status(200).json({
      id: user.id,
      profilePicture: user.profilePicture,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const setProfilePicture = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.files) throw new Error("No file attached");
    const image: UploadedFile = req.files.postImage as UploadedFile;

    const user = await UserModel.findById(req.userId);
    if (!user) throw new Error("User not found");

    const post = await PostModel.create({
      author: req.userId,
      description: req.body.description,
    });

    const filePath = path.join(__dirname, "..", "..", "uploads", post.id.toString());
    await image.mv(filePath);

    await UserModel.findByIdAndUpdate(req.userId, { profilePicture: post.id });

    res.status(200).json({ message: "Profile picture set" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
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
    res.status(400).json({ message: err.message });
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
    res.status(400).json({ message: err.message });
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
    res.status(400).json({ message: err.message });
  }
});

export default {
  registerUser,
  getProfile,
  setProfilePicture,
  followUser,
  unfollowUser,
  deleteUser,
};
