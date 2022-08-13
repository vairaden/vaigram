import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";

const Register: NextPage = () => {
  const [registerError, setRegisterError] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRegisterError(() => null);

    if (password !== controlPassword) {
      setRegisterError(() => "Passwords are not the same");
      return;
    }

    dispatch(
      register({
        username,
        firstName,
        lastName,
        email,
        password,
      })
    );
  }

  return (
    <>
      {registerError && <div>{registerError}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Name
          <input
            name="name"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <label>
          Surname
          <input
            name="surname"
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setLastName(e.target.value);
            }}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label>
          Repeat password
          <input
            name="password2"
            type="password"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setControlPassword(e.target.value);
            }}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
