import { useCallback, useMemo, useRef } from "react";
import { getMultiplePosts } from "../shared/api/postApi";
import PostCard from "../entities/PostCard";

interface IPost {
  id: string;
  author: {
    id: string;
    profilePicture: string | null;
    username: string;
  };
  description: string;
  image: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function PostList({
  limit,
  pagesToKeep = null,
  authorId = null,
  allowPostDeletion = false,
}: {
  limit: number;
  pagesToKeep?: number;
  authorId?: string;
  allowPostDeletion?: boolean;
}) {
  const queryClient = useQueryClient();

  const { isLoading, data, error, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["posts", authorId],
    ({ pageParam = { limit, cursor: null, authorId } }) => getMultiplePosts(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor
          ? {
              limit,
              cursor: lastPage.nextCursor,
              authorId,
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
          queryClient.setQueryData(["posts", authorId], (data: any) =>
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
    [fetchNextPage, hasNextPage, isLoading, pagesToKeep, authorId, queryClient]
  );

  const posts = useMemo(() => {
    let postList: IPost[] = [];
    if (data) {
      for (let page of data.pages) {
        postList = [...postList, ...page.posts];
      }
    }
    return postList;
  }, [data]);

  return (
    <>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error || !data ? (
        <h2>Error connecting to server</h2>
      ) : (
        <ul>
          {posts.map((post, index) =>
            index + 1 === posts.length ? (
              <li key={post.id}>
                <PostCard
                  forwardRef={lastPostRef}
                  postData={post}
                  allowDeletion={allowPostDeletion}
                />
              </li>
            ) : (
              <li key={post.id}>
                <PostCard postData={post} allowDeletion={allowPostDeletion} />
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
}
