import expressAsyncHandler from "express-async-handler";
import prisma from "../prisma";

const getComments = expressAsyncHandler(async (req, res) => {
  try {
    const limit = Number(req.query.limit);

    const comments = await prisma.comment.findMany({
      cursor: { id: req.query.cursor ? Number(req.query.cursor) : 0 },
      take: Number(req.params.limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            profilePicture: true,
            username: true,
          },
        },
        post: {
          select: {
            id: true,
          },
        },
      },
    });

    const hasMore = comments.length === limit;
    const nextCursor = hasMore ? comments[limit - 1].id : null;

    res.status(200).json({ comments, nextCursor });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const createComment = expressAsyncHandler(async (req, res) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { id: req.userId } });
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: Number(req.params.postId) },
    });

    await prisma.comment.create({
      data: {
        authorId: user.id,
        postId: post.id,
        content: req.body.comment,
      },
    });

    res.status(200).json({ message: "Comment created" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const getCommentLikes = expressAsyncHandler(async (req, res) => {
  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id: Number(req.params.commentId) },
    });

    if (!comment) throw new Error("Post not found");

    const commentLikes = await prisma.commentLike.findMany({ where: { userId: req.userId } });
    res.status(200).json({ commentLikes });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const likeComment = expressAsyncHandler(async (req, res) => {
  try {
    const comment = await prisma.comment.findUniqueOrThrow({
      where: { id: Number(req.params.commentId) },
    });

    if (!comment) throw new Error("Post not found");

    await prisma.commentLike.create({ data: { commentId: comment.id, userId: req.userId! } });
    res.status(200).json({ message: "Comment liked" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const deleteCommentLike = expressAsyncHandler(async (req, res) => {
  try {
    await prisma.commentLike.delete({
      where: {
        userId_commentId: {
          userId: req.userId!,
          commentId: Number(req.params.commentId),
        },
      },
    });
    res.status(200).json({ message: "Comment disliked" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

const deleteComment = expressAsyncHandler(async (req, res) => {
  try {
    const commentId = Number(req.params.commentId);
    await prisma.comment.delete({ where: { id: commentId } });

    res.status(200).json({ message: "Comment deleted" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export {
  getComments,
  createComment,
  deleteComment,
  getCommentLikes,
  likeComment,
  deleteCommentLike,
};
