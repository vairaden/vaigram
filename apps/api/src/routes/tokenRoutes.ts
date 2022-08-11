import express from "express";
import tokenController from "../controllers/tokenController";

const router = express.Router();

router.get("/refresh", tokenController.handleRefreshToken);

export default router;
