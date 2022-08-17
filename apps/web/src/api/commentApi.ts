import { IComment } from "dtos";
import api from "./index";

async function getMultipleComments(postId: string) {
  const res = await api.get<IComment[]>("/comments/multiple_comments", {
    params: {
      postId,
    },
  });

  return res.data;
}

async function createComment() {
  const res = await api.post("/posts/multiple_posts", {});
  return res;
}

async function deleteComment() {
  const res = await api.post("/posts/multiple_posts", {});
  return res;
}

export { getMultipleComments, createComment, deleteComment };
