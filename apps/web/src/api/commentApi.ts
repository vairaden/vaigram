import { IComment } from "dtos";
import api from "./index";

async function getMultipleComments(postId: string) {
  const res = await api.get<IComment[]>(`/posts/${postId}/comments`);

  return res.data;
}

async function createComment(postId: string, data: FormData) {
  const res = await api.post(`/posts/${postId}/comments`, data);
  return res;
}

async function deleteComment(postId: string) {
  const res = await api.delete(`/posts/${postId}/comments`);
  return res;
}

export { getMultipleComments, createComment, deleteComment };
