import express from "express";

import postController from "../controllers/postController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", postController.getMultiplePosts);

router.get("/:postId", postController.getPostById);

router.post("/", protect, postController.createPost);

router.post("/:postId/likes", protect, postController.likePost);

router.delete("/:postId/like", protect, postController.deletePostLike);

router.delete("/:postId", protect, postController.deletePostById);

export default router;
