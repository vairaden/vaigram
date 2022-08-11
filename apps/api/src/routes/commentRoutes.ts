import express from "express";

import commentController from "../controllers/commentController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create_comment", protect, commentController.createComment);

router.get("/multiple_comments", commentController.getMultipleComments);

router.delete("/delete_comment", protect, commentController.deleteComment);

export default router;
