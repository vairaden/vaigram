import { IComment } from "dtos";
import api from "./index";

async function getMultipleComments(query: { postId: string; cursor: string; limit: number }) {
  const res = await api.get<{ comments: IComment[]; nextCursor: string | null }>(
    `/posts/${query.postId}/comments`,
    { params: { limit: query.limit, cursor: query.cursor } }
  );

  return res.data;
}

async function createComment(data: { postId: string; comment: string }) {
  const res = await api.post(`/posts/${data.postId}/comments`, { comment: data.comment });
  return res;
}

async function deleteComment(postId: string) {
  const res = await api.delete(`/posts/${postId}/comments`);
  return res;
}

async function likeComment(data: { postId: string; commentId: string }) {
  const res = await api.post(`/posts/${data.postId}/comments/${data.commentId}/likes`);
  return res.data;
}

async function dislikeComment(data: { postId: string; commentId: string }) {
  const res = await api.post(`/posts/${data.postId}/comments/${data.commentId}/dislikes`);
  return res.data;
}

export { getMultipleComments, createComment, deleteComment, likeComment, dislikeComment };
