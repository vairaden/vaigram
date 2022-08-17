import { NextPage } from "next";
import Link from "next/link";
import { FormEvent } from "react";

const Login: NextPage = () => {
  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  }

  return (
    <>
      <form onSubmit={submitLogin}>
        <label>
          Login
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
      <Link href="/register">Register</Link>
    </>
  );
};

export default Login;
