import { IUser } from "dtos";
import { loginValidator } from "validators";
import { z } from "zod";
import api from ".";

async function refreshAccess() {
  const res = await api.get<IUser>("/auth/refresh");
  sessionStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
}

async function loginUser(credentials: z.infer<typeof loginValidator>) {
  const res = await api.post<IUser>("/auth", credentials);
  sessionStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
}

async function logoutUser() {
  const res = await api.delete("/auth");
  sessionStorage.removeItem("accessToken");

  return res.data;
}

export { refreshAccess, loginUser, logoutUser };
