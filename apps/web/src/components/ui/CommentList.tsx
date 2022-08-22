import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { IComment } from "dtos";
import { FC, useCallback, useMemo, useRef } from "react";
import { getMultipleComments } from "../../api/commentApi";

interface IProps {
  limit: number;
  pagesToKeep?: number;
  postId: string;
}

const CommentList: FC<IProps> = ({ limit, pagesToKeep, postId }) => {
  const queryClient = useQueryClient();

  const { isLoading, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["posts", postId],
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
  const lastPostRef = useCallback(
    (node: HTMLElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          queryClient.setQueryData(["posts", postId], (data: any) =>
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
      ) : (
        <ul>
          {comments.map((comment, index) =>
            index + 1 === comments.length ? (
              <li key={comment.id}>{comment.content}</li>
            ) : (
              <li key={comment.content}></li>
            )
          )}
        </ul>
      )}
    </>
  );
};
export default CommentList;
