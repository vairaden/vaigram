import express from "express";

import userController from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/logout", protect, userController.logoutUser);

router.get("/profile", protect, userController.getProfile);

router.patch("/follow_user", protect, userController.followUser);

router.patch("/unfollow_user", protect, userController.unfollowUser);

router.delete("/delete_user", protect, userController.deleteUser);

export default router;
