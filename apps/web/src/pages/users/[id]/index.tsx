import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { logoutUser, refreshAccess } from "../../../api/authApi";
import { followUser, getProfile } from "../../../api/userApi";
import Button from "../../../components/ui/Button";
import PostList from "../../../components/ui/PostList";

const Profile: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const profileId = router.query.id as string;

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery(["profile", profileId], () => getProfile(profileId), { enabled: !!profileId });

  const { data: user } = useQuery(["user"], () => refreshAccess());

  const logout = useMutation(() => logoutUser(), {
    onSuccess: () => queryClient.resetQueries(["user"]),
  });

  const follow = useMutation(() => followUser(profileId), {
    onSuccess: () => queryClient.resetQueries(["profile", user?.id]),
  });

  function handleLogout() {
    logout.mutate();
    router.push("/");
  }

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
          <Head>
            <title>{profile ? `${profile.firstName} ${profile.lastName}` : "Profile"}</title>
          </Head>
          <section className="mb-4 flex border-black rounded-lg border-2 overflow-hidden">
            <Image
              width="150px"
              height="150px"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${profile.profilePicture}`}
              alt="Profile picture"
            />
            <div className="flex flex-col ml-4">
              <h2>{profile.username}</h2>
              <p>{`${profile.firstName} ${profile.lastName}`}</p>
              <Link href={`/users/${profileId}/following`}>
                <a>Following</a>
              </Link>
              {user?.id !== profileId && (
                <Button onClick={follow.mutate} className="mt-auto mb-2">
                  Follow
                </Button>
              )}
              {user?.id === profileId && (
                <Button onClick={handleLogout} className="mt-auto mb-2">
                  Logout
                </Button>
              )}
            </div>
          </section>
          <PostList limit={4} authorId={profileId} allowPostDeletion={user?.id === profileId} />
        </>
      )}
    </>
  );
};
export default Profile;
