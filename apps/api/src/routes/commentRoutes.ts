import express from "express";

import commentController from "../controllers/commentController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", protect, commentController.createComment);

router.get("/", commentController.getMultipleComments);

router.delete("/", protect, commentController.deleteComment);

router.post("/:commentId/likes", protect, commentController.deleteComment);

router.delete("/:commentId/likes", protect, commentController.deleteComment);

export default router;
