import { IUser } from "dtos";
import api from ".";

async function refreshAccess() {
  const res = await api.get<IUser>("/auth/refresh");
  sessionStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
}

async function loginUser(userData: { username: string; password: string }) {
  const res = await api.post<IUser>("/auth", userData);
  sessionStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
}

async function logoutUser() {
  const res = await api.delete("/auth");
  sessionStorage.removeItem("accessToken");

  return res.data;
}

export { refreshAccess, loginUser, logoutUser };
