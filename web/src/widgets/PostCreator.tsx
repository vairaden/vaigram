import { ChangeEvent, FC, FormEvent, useState } from "react";
import { createPost } from "../shared/api/postApi";
import Button from "../shared/ui/Button";
import { refreshAccess } from "../shared/api/authApi";
import DropdownAnimation from "../animations/DropdownAnimation";
import ToggleSwitch from "../shared/ui/ToggleSwitch";
import { setProfilePicture } from "../shared/api/userApi";
import { Link } from "react-router-dom";

export default function PostCreator({
  isOpened,
  closeCallback,
}: {
  isOpened: boolean;
  closeCallback: () => void;
}) {
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    <aside>
      <DropdownAnimation isOpen={isOpened}>
        <div>
          {user ? (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {postImage && (
                <Image
                  width="800px"
                  height="800px"
                  src={URL.createObjectURL(postImage)}
                  alt="Selected image"
                />
              )}
              <label>
                <span>Choose image</span>
                <input
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
                  name="description"
                  value={postDescription}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setPostDescription(e.target.value)
                  }
                />
              </label>
              <ToggleSwitch isOn={profilePic} onClick={() => setProfilePic((prev) => !prev)}>
                Set as profile picture
              </ToggleSwitch>
              <Button type="submit">Create post</Button>
            </form>
          ) : (
            <div>
              <p>You are not logged in</p>
              <Link onClick={closeCallback} to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </DropdownAnimation>
    </aside>
  );
}
