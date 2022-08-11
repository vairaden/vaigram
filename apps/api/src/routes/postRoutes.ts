import express from "express";

import postController from "../controllers/postController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/multiple_posts", postController.getMultiplePosts);

router.get("/one_post", postController.getPostById);

router.post("/create_post", protect, postController.createPost);

router.patch("/like_post", protect, postController.likePost);

router.patch("/delete_post_like", protect, postController.deletePostLike);

router.delete("/delete_post", protect, postController.deletePostById);

export default router;
