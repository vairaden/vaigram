import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Comment {
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

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getComments: builder.query<
      { comments: Comment[]; cursor: number; hasNextPage: boolean },
      { postId: string; limit: number; cursor: number }
    >({
      query: ({ postId, limit, cursor }) => "comments",
      merge(currentCacheData, responseData) {
        currentCacheData.comments.push(...responseData.comments);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetCommentsQuery } = commentsApi;
