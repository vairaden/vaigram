import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import { logoutUser, refreshAccess } from "../api/authApi";
import Button from "../components/Button";

const Profile: NextPage = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["user"], () => refreshAccess());

  const logout = useMutation(["user"], () => logoutUser(), {
    onSuccess: () => queryClient.resetQueries(["user"]),
  });

  return (
    <>{data ? <Button onClick={() => logout.mutate()}>Logout</Button> : <h2>Not logged in</h2>}</>
  );
};
export default Profile;
