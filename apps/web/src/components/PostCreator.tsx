import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postApi";

const PostCreator: FC = () => {
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);

  const [postImageList, setPostImageList] = useState<FileList | null>(null);
  const [imageValid, setImageValid] = useState<boolean>(true);

  const [postDescription, setPostDescription] = useState<string>("");
  const [postDescriptionValid, setPostDescriptionValid] = useState<boolean>(true);

  const queryClient = useQueryClient();

  const addPost = useMutation((data: FormData) => createPost(data), {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (postImageList === null || postImageList[0] === null) {
      setImageValid(false);
      return;
    }

    if (postDescription.length > 1000) {
      setPostDescriptionValid(false);
      return;
    }

    const data = new FormData(event.currentTarget);

    addPost.mutate(data);
  }

  function openCreatorToggle() {
    setCreatorOpened((prev) => !prev);
  }

  return (
    <div className="flex-col align-center">
      <button type="button" onClick={openCreatorToggle} className="bg-orange-400">
        {creatorOpened ? "Close" : "New post"}
      </button>
      {creatorOpened &&
        (true ? (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
              Choose image
              <input
                type="file"
                accept="image/*"
                name="postImage"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPostImageList(e.target.files)}
              />
            </label>
            {imageValid || <p>Error</p>}
            <label>
              Description
              <textarea
                className="block"
                name="description"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setPostDescription(e.target.value)
                }
              />
            </label>
            {postDescriptionValid || <p>Error</p>}
            <button type="submit">Create post</button>
          </form>
        ) : (
          <>
            <p>You are not logged in</p>
            <Link href="/login">Login</Link>
          </>
        ))}
    </div>
  );
};

export default PostCreator;
