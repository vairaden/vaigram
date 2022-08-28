import express from "express";

import commentController from "../controllers/commentController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:postId/comments", protect, commentController.createComment);

router.get("/:postId/comments", commentController.getMultipleComments);

router.delete("/:postId/comments", protect, commentController.deleteComment);

router.post("/:postId/comments/:commentId/likes", protect, commentController.likeComment);

router.post("/:postId/comments/:commentId/dislikes", protect, commentController.dislikeComment);

export default router;
