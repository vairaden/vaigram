import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../api/postApi";
import Image from "next/image";
import Button from "./Button";
import { refreshAccess } from "../../api/authApi";
import DropdownAnimation from "../animations/DropdownAnimation";
import ToggleSwitch from "./ToggleSwitch";
import { setProfilePicture } from "../../api/userApi";

interface IProps {
  isOpened: boolean;
  closeCallback: () => void;
}

const PostCreator: FC<IProps> = ({ isOpened, closeCallback }) => {
  const queryClient = useQueryClient();

  const [postImage, setPostImage] = useState<File | null>(null);
  const [postDescription, setPostDescription] = useState("");
  const [profilePic, setProfilePic] = useState(false);

  const { data: user } = useQuery(["user"], () => refreshAccess());
  const addPost = useMutation((data: FormData) => createPost(data), {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const profilePicMutation = useMutation((data: FormData) => setProfilePicture(user!.id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      queryClient.invalidateQueries(["posts"]);
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!postImage) return;
    if (postDescription.length === 0) return;

    closeCallback();

    let data = new FormData();
    data.append("postImage", postImage);
    data.append("description", postDescription);

    if (profilePic) {
      profilePicMutation.mutate(data);
    } else {
      addPost.mutate(data);
    }
    setPostDescription("");
    setPostImage(null);
  }
  return (
    <section className="flex flex-col fixed z-30 left-[50%] translate-x-[-50%] translate-y-16">
      <DropdownAnimation isOpen={isOpened}>
        <div className="border-black border-2 rounded-[20px] bg-white overflow-hidden w-[23rem]">
          {user ? (
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="flex flex-col text-center"
            >
              {postImage && (
                <Image
                  width="800px"
                  height="800px"
                  src={URL.createObjectURL(postImage)}
                  alt="Selected image"
                />
              )}
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
              <ToggleSwitch
                className="p-2"
                isOn={profilePic}
                onClick={() => setProfilePic((prev) => !prev)}
              >
                Set as profile picture
              </ToggleSwitch>
              <Button type="submit" className="w-fit mx-auto my-2">
                Create post
              </Button>
            </form>
          ) : (
            <div className="px-4">
              <p>You are not logged in</p>
              <Link href="/login">
                <a onClick={closeCallback} className="underline text-gray-700">
                  Login
                </a>
              </Link>
            </div>
          )}
        </div>
      </DropdownAnimation>
    </section>
  );
};

export default PostCreator;
