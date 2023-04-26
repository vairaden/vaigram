import express from "express";

import protect from "../middlewares/authMiddleware";
import upload from "../middlewares/storageMiddleware";
import {
  createPost,
  deletePostById,
  deletePostLike,
  getMultiplePosts,
  getPostById,
  likePost,
} from "../controllers/postController";

const postRoutes = express.Router();

postRoutes.get("/", getMultiplePosts);

postRoutes.get("/:postId", getPostById);

postRoutes.post("/", protect, upload.single("postImage"), createPost);

postRoutes.post("/:postId/likes", protect, likePost);

postRoutes.post("/:postId/dislikes", protect, deletePostLike);

postRoutes.delete("/:postId", protect, deletePostById);

export default postRoutes;
