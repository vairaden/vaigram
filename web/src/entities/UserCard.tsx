import { getProfile, unfollowUser } from "../shared/api/userApi";
import Button from "../shared/ui/Button";

export default function UserCard({ userId, profileId }: { userId: string; profileId: string }) {
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery(["profile", userId], () => getProfile(userId), { enabled: !!userId });

  const unfollowMutation = useMutation(
    (id: string) => {
      return unfollowUser(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile", profileId]);
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>Error connecting to server</h2>
      ) : !profile ? (
        <h2>Not logged in</h2>
      ) : (
        <article>
          {/* <Image
            width="40px"
            height="40px"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_PATH}/${profile.profilePicture}`}
            alt="Profile pic"
          /> */}
          <p>
            <h2>{profile.username}</h2>
            {profile.firstName} {profile.lastName}
          </p>
          <Button onClick={() => unfollowMutation.mutate(userId)}>Unfollow</Button>
        </article>
      )}
    </>
  );
}
