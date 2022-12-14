import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import path from "path";

import CommentModel from "../models/comments";
import PostModel from "../models/posts";

const fs = require("fs").promises;

const getMultiplePosts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const limit = Number(req.query.limit);
    const cursor = req.query.cursor ? req.query.cursor.toString() : null;
    const authorId = req.query.authorId ? req.query.authorId.toString() : null;

    if (cursor) {
      const posts = await PostModel.find(
        authorId
          ? { createdAt: { $lt: new Date(cursor) }, author: authorId }
          : { createdAt: { $lt: new Date(cursor) } }
      )
        .sort({
          createdAt: "descending",
        })
        .limit(limit)
        .populate("author", ["id", "profilePicture", "username"]);

      const hasMore = posts.length === limit;
      const nextCursor = hasMore ? posts[limit - 1].createdAt.toString() : null;

      res.status(200).json({ posts, nextCursor });
    } else {
      const posts = await PostModel.find(authorId ? { author: authorId } : {})
        .sort({
          createdAt: "descending",
        })
        .limit(limit)
        .populate("author", ["id", "profilePicture", "username"]);

      const hasMore = posts.length === limit;
      const nextCursor = hasMore ? posts[limit - 1].createdAt : null;

      res.status(200).json({ posts, nextCursor });
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const getPostById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate("author", [
      "id",
      "profilePicture",
      "username",
    ]);

    res.status(200).json(post);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const createPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.file) throw new Error("No file attached");
    await PostModel.create({
      author: req.userId,
      description: req.body.description,
      image: req.file.filename,
    });
    res.status(200).json({
      message: "Post created",
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const likePost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (!post) throw new Error("Post not found");

    await PostModel.findByIdAndUpdate(req.params.postId, { likes: post.likes + 1 });

    res.status(200).json({ message: "Post liked" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const dislikePost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (!post) throw new Error("Post not found");

    await PostModel.findByIdAndUpdate(req.params.postId, { dislikes: post.dislikes + 1 });

    res.status(200).json({ message: "Post disliked" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const deletePostById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.postId).populate("author", ["id"]);

    if (!post) throw new Error("Post not found");
    if (post.author.id.toString() !== req.userId) throw new Error("Deletion not authorized");

    await PostModel.findByIdAndDelete(post.id);
    const filePath = path.join("/uploads", post.image);
    await fs.unlink(filePath);

    await CommentModel.deleteMany({ post: post.id });

    res.status(200).json({ message: "Post deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default {
  getMultiplePosts,
  getPostById,
  createPost,
  likePost,
  dislikePost,
  deletePostById,
};
