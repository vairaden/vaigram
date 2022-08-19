import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginValidator } from "validators";
import { z } from "zod";
import { loginUser, refreshAccess } from "../api/authApi";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

const Login: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    login.mutate({ username, password });
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col">
        <form onSubmit={submitLogin} className="flex flex-col">
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
          <a className="text-gray-700 underline mx-auto">Or register</a>
        </Link>
      </div>
    </>
  );
};

export default Login;
