import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { logoutUser, refreshAccess } from "../../api/authApi";
import Button from "../../components/ui/Button";
import PostList from "../../components/ui/PostList";

const Profile: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const userId = router.query.id as string;

  const { isLoading, error, data: user } = useQuery(["user"], () => refreshAccess());
  const logout = useMutation(() => logoutUser(), {
    onSuccess: () => queryClient.resetQueries(["user"]),
  });

  function handleLogout() {
    logout.mutate();
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>{user ? `${user.firstName} ${user.lastName}` : "Profile"}</title>
      </Head>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>Error connecting to server</h2>
      ) : !user ? (
        <h2>Not logged in</h2>
      ) : (
        <>
          <section className="mb-4 flex border-black rounded-lg border-2 overflow-hidden">
            <Image
              width="150px"
              height="150px"
              src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${user.profilePicture}`}
              alt="Profile picture"
            />
            <div className="flex flex-col ml-4">
              <h2>{user.username}</h2>
              <p>
                {user.firstName}
                {user.lastName}
              </p>
              {user.id === userId && (
                <Button onClick={handleLogout} className="mt-auto mb-2">
                  Logout
                </Button>
              )}
            </div>
          </section>
          <PostList limit={4} authorId={userId} allowPostDeletion />
        </>
      )}
    </>
  );
};
export default Profile;
