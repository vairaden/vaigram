import express from "express";

import postController from "../controllers/postController";
import protect from "../middlewares/authMiddleware";
import upload from "../middlewares/storageMiddleware";

const router = express.Router();

router.get("/", postController.getMultiplePosts);

router.get("/:postId", postController.getPostById);

router.post("/", protect, upload.single("postImage"), postController.createPost);

router.post("/:postId/likes", protect, postController.likePost);

router.post("/:postId/dislikes", protect, postController.dislikePost);

router.delete("/:postId", protect, postController.deletePostById);

export default router;
