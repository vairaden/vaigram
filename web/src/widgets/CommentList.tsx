import { FC, useCallback, useMemo, useRef, useState } from "react";
import { getMultipleComments } from "../shared/api/commentApi";
import CommentCard from "../entities/CommentCard";
import { useGetCommentsQuery } from "../shared/store/apiSlice";

interface IComment {
  id: string;
  author: {
    id: string;
    profilePicture: string | null;
    username: string;
  };
  post: {
    id: string;
  };
  content: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function CommentList({
  limit,
  pagesToKeep,
  postId,
}: {
  limit: number;
  pagesToKeep?: number;
  postId: string;
}) {
  const [cursor, setCursor] = useState(0);
  const { data, isLoading, isError } = useGetCommentsQuery({ postId, cursor, limit });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data && data.hasNextPage) {
          setCursor(data.cursor);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, pagesToKeep, postId]
  );

  return (
    <>
      {isLoading ? (
        <h2>Loading</h2>
      ) : isError || !data ? (
        <h2>Error connecting to server</h2>
      ) : data.comments.length === 0 ? (
        <h2>Nobody commented this post yet</h2>
      ) : (
        <ul>
          {data.comments.map((comment, index, array) =>
            index + 1 === array.length ? (
              <li key={comment.id}>
                <CommentCard commentData={comment} forwardRef={lastCommentRef} />
              </li>
            ) : (
              <li key={comment.content}>
                <CommentCard commentData={comment} />
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
