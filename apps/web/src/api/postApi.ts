import { IPost } from "dtos";
import api from "./index";

async function getMultiplePosts(limit: number, pageNumber: number) {
  const res = await api.get<IPost[]>("/posts", {
    params: {
      limit,
      pageNumber,
    },
  });
  return res.data;
}

async function getOnePost(postId: string) {
  const res = await api.get<IPost>("/posts/one_post", { params: { postId } });

  return res.data;
}

async function createPost(data: FormData) {
  const res = await api.post("/posts/create_post", data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return res.data;
}

async function deletePost(postId: string) {
  const res = await api.delete("/posts/delete_post", { params: { postId } });
  return res.data;
}

async function likePost(postId: string) {
  const res = await api.patch("/posts/like_post", undefined, { params: { postId } });
  return res.data;
}

async function deletePostLike(postId: string) {
  const res = await api.patch("/posts/delete_post_like", undefined, { params: { postId } });
  return res.data;
}

export { getMultiplePosts, getOnePost, createPost, deletePost, likePost, deletePostLike };
