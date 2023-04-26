import express from "express";

import protect from "../middlewares/authMiddleware";
import upload from "../middlewares/storageMiddleware";
import {
  deleteUser,
  getProfile,
  registerUser,
  setProfilePicture,
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/", registerUser);

userRoutes.get("/:userId", getProfile);

userRoutes.post("/:userId/profile_picture", protect, upload.single("postImage"), setProfilePicture);

userRoutes.delete("/", protect, deleteUser);

export default userRoutes;
