import express from "express";

import protect from "../middlewares/authMiddleware";
import {
  createComment,
  deleteComment,
  deleteCommentLike,
  getCommentLikes,
  getComments,
  likeComment,
} from "../controllers/commentController";

const commentRoutes = express.Router();

commentRoutes.post("/:postId/comments", protect, createComment);

commentRoutes.get("/:postId/comments", getComments);

commentRoutes.delete("/:postId/comments", protect, deleteComment);

commentRoutes.get("/:postId/comments/:commentId/likes", getCommentLikes);

commentRoutes.post("/:postId/comments/:commentId/likes", protect, likeComment);

commentRoutes.delete("/:postId/comments/:commentId/likes", protect, deleteCommentLike);

export default commentRoutes;
