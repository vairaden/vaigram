import express from "express";

import userController from "../controllers/userController";
import protect from "../middlewares/authMiddleware";
import upload from "../middlewares/storageMiddleware";

const router = express.Router();

router.post("/", userController.registerUser);

router.get("/:userId", userController.getProfile);

router.post(
  "/:userId/profile_picture",
  protect,
  upload.single("postImage"),
  userController.setProfilePicture
);

router.post("/:othUserId/follow", protect, userController.followUser);

router.post("/:othUserId/unfollow", protect, userController.unfollowUser);

router.delete("/", protect, userController.deleteUser);

export default router;
