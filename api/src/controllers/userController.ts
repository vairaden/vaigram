import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma";
import { deleteRefreshToken, generateTokens, storeRefreshToken } from "../services/tokenService";

const registerUser = expressAsyncHandler(async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = generateTokens({ userId: user.id });
    await storeRefreshToken(user.id, refreshToken);

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

const getProfile = expressAsyncHandler(async (req, res) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: req.userId } });

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

const setProfilePicture = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.file) throw new Error("No file attached");

    await prisma.post.create({
      data: {
        authorId: req.userId!,
        description: req.body.description,
        image: req.file.filename,
      },
    });

    await prisma.user.update({
      where: { id: req.userId },
      data: { profilePicture: req.file.filename },
    });

    res.status(200).json({ message: "Profile picture set" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const user = await prisma.user.delete({ where: { id: req.userId } });

    if (!user) throw new Error("User not found");

    await deleteRefreshToken(user.id);

    res
      .status(200)
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ message: "User deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export { registerUser, getProfile, setProfilePicture, deleteUser };
