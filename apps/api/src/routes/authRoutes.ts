import express from "express";
import authController from "../controllers/authController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/refresh", authController.handleRefreshToken);

router.post("/", authController.loginUser);

router.delete("/", protect, authController.logoutUser);

export default router;
