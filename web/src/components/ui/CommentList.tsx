import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useCallback, useMemo, useRef } from "react";
import { getMultipleComments } from "../../api/commentApi";
import CommentCard from "./CommentCard";

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

interface IProps {
  limit: number;
  pagesToKeep?: number;
  postId: string;
}

const CommentList: FC<IProps> = ({ limit, pagesToKeep, postId }) => {
  const queryClient = useQueryClient();

  const { isLoading, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["comments", postId],
    ({ pageParam = { postId, limit, cursor: null } }) => getMultipleComments(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor
          ? {
              postId,
              limit,
              cursor: lastPage.nextCursor,
            }
          : undefined,
    }
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          queryClient.setQueryData(["comments", postId], (data: any) =>
            data.pages.length === pagesToKeep
              ? {
                  pages: data.pages.slice(1),
                  pageParams: data.pageParams.slice(1),
                }
              : data
          );
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, pagesToKeep, postId, queryClient]
  );

  const comments = useMemo(() => {
    let commentList: IComment[] = [];
    if (data) {
      for (let page of data.pages) {
        commentList = [...commentList, ...page.comments];
      }
    }
    return commentList;
  }, [data]);

  return (
    <>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error || !data ? (
        <h2>Error connecting to server</h2>
      ) : comments.length === 0 ? (
        <h2>Nobody commented this post yet</h2>
      ) : (
        <ul className="mt-2">
          {comments.map((comment, index) =>
            index + 1 === comments.length ? (
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
};

export default CommentList;
