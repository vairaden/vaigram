import express from "express";

import userController from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", userController.registerUser);

router.get("/:userId", userController.getProfile);

router.post("/:othUserId/profile_picture", protect, userController.setProfilePicture);

router.post("/:othUserId/follow", protect, userController.followUser);

router.post("/:userId/unfollow", protect, userController.unfollowUser);

router.delete("/", protect, userController.deleteUser);

export default router;
