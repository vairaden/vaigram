import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api/postApi";
import Image from "next/image";
import Button from "./Button";
import { refreshAccess } from "../../api/authApi";
import DropdownAnimation from "../animations/DropdownAnimation";

const PostCreator: FC = () => {
  const queryClient = useQueryClient();

  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postDescription, setPostDescription] = useState<string>("");

  const { data: user } = useQuery(["user"], () => refreshAccess());
  const addPost = useMutation((data: FormData) => createPost(data), {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!postImage) return;
    if (postDescription.length === 0) return;

    setCreatorOpened((prev) => !prev);

    let data = new FormData();
    data.append("postImage", postImage);
    data.append("description", postDescription);
    addPost.mutate(data);
    setPostDescription("");
    setPostImage(null);
  }

  return (
    <section className="flex flex-col">
      <Button onClick={() => setCreatorOpened((prev) => !prev)}>
        {creatorOpened ? "Close" : "New post"}
      </Button>
      <DropdownAnimation isOpen={creatorOpened}>
        {user ? (
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col text-center border-black border-2 rounded-[8px]"
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
                value={postDescription}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setPostDescription(e.target.value)
                }
              />
            </label>
            <Button type="submit" className="w-fit mx-auto my-2">
              Create post
            </Button>
          </form>
        ) : (
          <>
            <p>You are not logged in</p>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        )}
      </DropdownAnimation>
    </section>
  );
};

export default PostCreator;
