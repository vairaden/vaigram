import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";

interface IProps {
  postAddedCallback: () => void;
}

const PostCreator: FC<IProps> = ({ postAddedCallback }) => {
  const user = useAppSelector((state) => state.auth.user);
  const [creatorOpened, setCreatorOpened] = useState<boolean>(false);

  const [postImageList, setPostImageList] = useState<FileList | null>(null);
  const [imageValid, setImageValid] = useState<boolean>(true);

  const [postDescription, setPostDescription] = useState<string>("");
  const [postDescriptionValid, setPostDescriptionValid] = useState<boolean>(true);

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

    createPost(data).then(() => {
      setCreatorOpened(() => false);
      postAddedCallback();
    });
  }

  function openCreatorToggle() {
    setCreatorOpened((prev) => !prev);
  }

  return (
    <>
      <button type="button" onClick={openCreatorToggle}>
        {creatorOpened ? "Close" : "New post"}
      </button>
      {creatorOpened &&
        (user ? (
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
    </>
  );
};

export default PostCreator;
