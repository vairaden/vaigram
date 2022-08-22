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

export { getMultipleComments, createComment, deleteComment };
