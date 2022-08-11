import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import CommentModel from "../models/comments";
import PostModel from "../models/posts";
import UserModel from "../models/users";

const getMultipleComments = asyncHandler(async (req: Request, res: Response) => {
  try {
    const comments = await CommentModel.find({ post: req.query.postId })
      .sort({
        createdAt: "descending",
      })
      .limit(Number(req.query.limit))
      .populate("author", ["username"]);

    res.status(200).json(comments);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const createComment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.query.userId);
    if (!user) throw new Error("User not found");
    const post = await PostModel.findById(req.query.postId);
    if (!post) throw new Error("Post not found");

    await CommentModel.create({
      author: user.id,
      post: post.id,
      content: req.body.commentContent,
    });

    res.status(200).json({ message: "Comment created" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const likeComment = asyncHandler(async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.findById(req.commentId);

    if (!comment) throw new Error("Post not found");

    CommentModel.findByIdAndUpdate(req.postId, { likes: comment.likes + 1 });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const deleteCommentLike = asyncHandler(async (req: Request, res: Response) => {
  try {
    const comment = await CommentModel.findById(req.commentId);

    if (!comment) throw new Error("Post not found");

    CommentModel.findByIdAndUpdate(req.postId, { likes: comment.likes - 1 });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  try {
    await CommentModel.findByIdAndDelete(req.query.commentId);

    res.status(200).json({ message: "Comment deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  getMultipleComments,
  createComment,
  likeComment,
  deleteCommentLike,
  deleteComment,
};
