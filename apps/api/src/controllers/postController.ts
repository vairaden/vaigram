import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UploadedFile } from "express-fileupload";
import path from "path";

import CommentModel from "../models/comments";
import PostModel from "../models/posts";

const fs = require("fs").promises;

const getMultiplePosts = asyncHandler(async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find()
      .sort({
        createdAt: "descending",
      })
      .limit(Number(req.query.limit))
      .populate("author", ["username"]);

    res.status(200).json(posts);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const getPostById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.query.postId).populate("author", ["username"]);

    res.status(200).json(post);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const createPost = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.files) throw new Error("No file attached");

    const image: UploadedFile = req.files.postImage as UploadedFile;

    const document = await PostModel.create({
      author: req.userId,
      description: req.body.description,
    });

    const filePath = path.join(__dirname, "..", "data", "images", document.id.toString());

    await image.mv(filePath);

    res.status(200).json({
      message: "Post created",
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const likePost = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.query.postId);

    if (!post) throw new Error("Post not found");

    await PostModel.findByIdAndUpdate(req.query.postId, { likes: post.likes + 1 });

    res.status(200).json({ message: "Post liked" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const deletePostLike = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.query.postId);

    if (!post) throw new Error("Post not found");

    PostModel.findByIdAndUpdate(req.postId, { likes: post.likes - 1 });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

const deletePostById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.query.postId).populate("author", ["id"]);

    if (!post) throw new Error("Post not found");
    if (post.author.id.toString() !== req.userId) throw new Error("Deletion not authorized");

    await PostModel.findByIdAndDelete(post.id);
    const filePath = path.join(__dirname, "..", "data", "images", post.id.toString());
    await fs.unlink(filePath);

    await CommentModel.deleteMany({ post: post.id });

    res.status(200).json({ message: "Post deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default {
  getMultiplePosts,
  getPostById,
  createPost,
  likePost,
  deletePostLike,
  deletePostById,
};
