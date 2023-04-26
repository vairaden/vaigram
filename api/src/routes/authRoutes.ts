import express from "express";
import protect from "../middlewares/authMiddleware";
import { handleRefreshToken, loginUser, logoutUser } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.get("/refresh", handleRefreshToken);

authRoutes.post("/", loginUser);

authRoutes.delete("/", protect, logoutUser);

export default authRoutes;
