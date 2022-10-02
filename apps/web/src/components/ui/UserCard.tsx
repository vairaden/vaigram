import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC } from "react";
import { getProfile } from "../../api/userApi";

interface IProps {
  userId: string;
}

const UserCard: FC<IProps> = ({ userId }) => {
  const {
    isLoading,
    error,
    data: profile,
  } = useQuery(["profile", userId], () => getProfile(userId), { enabled: !!userId });

  return (
    <>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>Error connecting to server</h2>
      ) : !profile ? (
        <h2>Not logged in</h2>
      ) : (
        <article className="flex border-2 border-black rounded-md">
          <Image
            className="rounded-[40px]"
            width="40px"
            height="40px"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${profile.profilePicture}`}
            alt="Profile pic"
          />
          <p>
            <h2>{profile.username}</h2>
            {profile.firstName} {profile.lastName}
          </p>
        </article>
      )}
    </>
  );
};

export default UserCard;
