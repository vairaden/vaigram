import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { registerUser } from "../../shared/api/userApi";
import Button from "../../shared/ui/Button";
import FormInput from "../../shared/ui/FormInput";

const Register = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);

  const registerValidator = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const queryClient = useQueryClient();
  const register = useMutation((data: z.infer<typeof registerValidator>) => registerUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterError(() => null);

    if (password !== controlPassword) {
      setRegisterError(() => "Passwords are not the same");
      return;
    }

    const data = {
      username,
      firstName,
      lastName,
      email,
      password,
    };

    try {
      registerValidator.parse(data);
      await register.mutateAsync(data);
      router.push("/");
    } catch (err: any) {
      setRegisterError("kek");
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <form onSubmit={handleSubmit}>
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
          name="name"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFirstName(e.target.value);
          }}
        >
          Name
        </FormInput>
        <FormInput
          name="surname"
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setLastName(e.target.value);
          }}
        >
          Surname
        </FormInput>
        <FormInput
          name="email"
          type="email"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        >
          Email
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
        <FormInput
          name="password2"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setControlPassword(e.target.value);
          }}
        >
          Repeat password
        </FormInput>
        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default Register;
