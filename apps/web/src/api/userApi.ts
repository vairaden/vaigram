import { IUser } from "dtos";
import api from "./index";

async function getProfile(userId: string) {
  const res = await api.get<IUser>("/users/register", { params: userId });

  return res;
}

async function followUser() {
  const res = await api.post<IUser>("/users/register");

  return res;
}

async function unfollowUser() {
  const res = await api.post<IUser>("/users/register");

  return res;
}

export { getProfile, followUser, unfollowUser };
