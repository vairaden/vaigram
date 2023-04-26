import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import HomePage from "../pages/home/HomePage";
import PostPage from "../pages/post/PostPage";
import { Provider } from "react-redux";
import { store } from "../shared/store";

import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/post", element: <PostPage /> },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
