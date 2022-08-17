import express from "express";

import userController from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", userController.registerUser);

router.get("/:userId", protect, userController.getProfile);

router.post("/:userId/following", protect, userController.followUser);

router.delete("/:userId/following", protect, userController.unfollowUser);

router.delete("/", protect, userController.deleteUser);

export default router;
