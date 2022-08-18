import { NextPage } from "next";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  }

  return (
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
  );
};

export default Login;
