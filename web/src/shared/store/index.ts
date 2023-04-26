import { configureStore } from "@reduxjs/toolkit";

import { counterSlice } from "./slice";
import { commentsApi } from "./apiSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(commentsApi.middleware),
});
