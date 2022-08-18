import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUserRequest } from "dtos";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { z } from "zod";
import { registerUser } from "../api/userApi";
import Button from "../components/Button";
import FormInput from "../components/FormInput";

const Register: NextPage = () => {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const registrationSchema = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  });

  const queryClient = useQueryClient();
  const register = useMutation((data: RegisterUserRequest) => {
    return registerUser(data);
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      registrationSchema.parse(data);
      register.mutate(data);
      router.push("/");
    } catch (err: any) {
      setRegisterError("kek");
    }
  }

  if (registerError) return <main>Error</main>;

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col w-96 mx-auto">
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
