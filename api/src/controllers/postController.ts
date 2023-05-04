import expressAsyncHandler from "express-async-handler";
import fs from "fs/promises";
import prisma from "../prisma";
import minio from "../services/minio";

const getMultiplePosts = expressAsyncHandler(async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const cursor = Number(req.query.cursor);
    const authorId = Number(req.query.authorId);

    const posts = await prisma.post.findMany({
      cursor: {
        id: cursor,
      },
      where: {
        authorId,
      },
      orderBy: {
        id: "desc",
      },
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            profilePicture: true,
            username: true,
          },
        },
      },
    });

    const hasMore = posts.length === limit;
    const nextCursor = hasMore ? posts[limit - 1].id : null;

    res.status(200).json({ posts, nextCursor });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const getPostById = expressAsyncHandler(async (req, res) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: Number(req.params.postId) },
      include: {
        author: {
          select: {
            id: true,
            profilePicture: true,
            username: true,
          },
        },
      },
    });

    res.status(200).json(post);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const createPost = expressAsyncHandler(async (req, res) => {
  try {
    if (!req.files) throw new Error("No file attached");

    // minio.fPutObject("vaigram-images", "imageName", req.files[);
    console.log(req.files);

    await prisma.post.create({
      data: {
        authorId: req.userId!,
        description: req.body.description,
        image: req.files.postImage.name,
      },
    });
    res.status(200).json({
      message: "Post created",
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const likePost = expressAsyncHandler(async (req, res) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({ where: { id: Number(req.params.postId) } });

    if (!post) throw new Error("Post not found");

    // await prisma.post.update({where: {id: Number(req.params.postId)}, { likes: post.likes + 1 }});

    res.status(200).json({ message: "Post liked" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const deletePostLike = expressAsyncHandler(async (req, res) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({ where: { id: Number(req.params.postId) } });

    if (!post) throw new Error("Post not found");

    // await prisma.post.update({req.params.postId, { dislikes: post.dislikes + 1 }});

    res.status(200).json({ message: "Post disliked" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const deletePostById = expressAsyncHandler(async (req, res) => {
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: Number(req.params.postId) },
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!post) throw new Error("Post not found");
    if (post.author.id !== req.userId) throw new Error("Deletion not authorized");

    await prisma.post.delete({ where: { id: post.id } });
    // const filePath = path.join("/uploads", post.image);
    await fs.unlink(filePath);

    await prisma.comment.deleteMany({ where: { id: post.id } });

    res.status(200).json({ message: "Post deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export { getMultiplePosts, getPostById, createPost, likePost, deletePostLike, deletePostById };
