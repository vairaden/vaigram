import { logoutUser, refreshAccess } from "../shared/api/authApi";
import { followUser, getProfile } from "../shared/api/userApi";
import Button from "../entities/Button";
import PostList from "../shared/ui/PostList";

const Profile = () => {
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
          <section>
            <Image
              width="150px"
              height="150px"
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${profile.profilePicture}`}
              alt="Profile picture"
            />
            <div>
              <h2>{profile.username}</h2>
              <p>{`${profile.firstName} ${profile.lastName}`}</p>
              <Link href={`/users/${profileId}/following`}>
                <a>Following</a>
              </Link>
              {user?.id !== profileId && <Button onClick={follow.mutate}>Follow</Button>}
              {user?.id === profileId && <Button onClick={handleLogout}>Logout</Button>}
            </div>
          </section>
          <PostList limit={4} authorId={profileId} allowPostDeletion={user?.id === profileId} />
        </>
      )}
    </>
  );
};
export default Profile;
