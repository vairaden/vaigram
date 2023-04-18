import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { loginUser, refreshAccess } from "../shared/api/authApi";
import Button from "../entities/Button";
import FormInput from "../shared/ui/FormInput";

const Login = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const loginValidator = z.object({
    username: z.string(),
    password: z.string(),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: user } = useQuery(["user"], () => refreshAccess());
  const login = useMutation(
    (credentials: z.infer<typeof loginValidator>) => loginUser(credentials),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  if (user) {
    router.push("/");
  }

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login.mutateAsync({ username, password });
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <form onSubmit={submitLogin}>
          <FormInput
            name="username"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          >
            Username
          </FormInput>
          <FormInput
            name="password"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          >
            Password
          </FormInput>
          <Button type="submit">Login</Button>
        </form>
        <Link href="/register">
          <a>Or register</a>
        </Link>
      </div>
    </>
  );
};

export default Login;
