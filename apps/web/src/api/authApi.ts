import { IUser } from "dtos";
import api from ".";

async function refreshAccess() {
  const res = await api.get("/auth/refresh");
  return res.data;
}

async function loginUser(userData: IUser) {
  const res = await api.post<IUser>("/auth", userData);
  return res.data;
}

async function logoutUser() {
  const res = await api.delete("/auth");
  return res.data;
}

export { refreshAccess, loginUser, logoutUser };
