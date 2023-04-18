import { getProfile } from "../../shared/api/userApi";
import UserCard from "../../entities/UserCard";

const Following = () => {
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
            <UserCard key={userId} userId={userId} profileId={profileId} />
          ))}
        </>
      )}
    </>
  );
};

export default Following;
