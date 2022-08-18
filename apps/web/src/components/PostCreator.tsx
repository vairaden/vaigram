import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/postApi";
import Image from "next/image";
import Button from "./Button";

const PostCreator: FC = () => {
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postDescription, setPostDescription] = useState<string>("");

  const queryClient = useQueryClient();

  const addPost = useMutation((data: FormData) => createPost(data), {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setCreatorOpened((prev) => !prev);

    let data = new FormData();
    addPost.mutate(data);
  }

  return (
    <section className="flex flex-col">
      <Button onClick={() => setCreatorOpened((prev) => !prev)}>
        {creatorOpened ? "Close" : "New post"}
      </Button>
      {creatorOpened &&
        (true ? ( //! User
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col text-center"
          >
            <label className="my-2">
              <span className="border-2 rounded border-black bg-orange-200 cursor-pointer">
                Choose image
              </span>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                name="postImage"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setPostImage(e.target.files ? e.target.files[0] : null);
                }}
              />
            </label>
            {postImage && (
              <Image
                src={URL.createObjectURL(postImage)}
                width="400px"
                height="400px"
                alt="Selected image"
              />
            )}
            <label>
              Description
              <textarea
                className="block my-2 w-full border-2"
                name="description"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setPostDescription(e.target.value)
                }
              />
            </label>
            <Button>Create post</Button>
          </form>
        ) : (
          <>
            <p>You are not logged in</p>
            <Link href="/login">Login</Link>
          </>
        ))}
    </section>
  );
};

export default PostCreator;
