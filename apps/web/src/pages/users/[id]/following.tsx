import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getProfile } from "../../../api/userApi";
import UserCard from "../../../components/ui/UserCard";

const Following: NextPage = () => {
  const router = useRouter();
  const profileId = router.query.id as string;

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery(["profile", profileId], () => getProfile(profileId), { enabled: !!profileId });

  return (
    <>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>Error connecting to server</h2>
      ) : !profile ? (
        <h2>Not logged in</h2>
      ) : (
        <>
          {profile.following.map((userId) => (
            <UserCard key={userId} userId={userId} />
          ))}
        </>
      )}
    </>
  );
};

export default Following;
