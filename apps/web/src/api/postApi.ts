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
  const res = await api.get<IPost>(`/posts/${postId}`);
  return res.data;
}

async function createPost(data: FormData) {
  const res = await api.post("/posts", data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return res.data;
}

async function deletePost(postId: string) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}

async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/likes`);
  return res.data;
}

async function deletePostLike(postId: string) {
  const res = await api.delete(`/posts/${postId}/likes`);
  return res.data;
}

export { getMultiplePosts, getOnePost, createPost, deletePost, likePost, deletePostLike };