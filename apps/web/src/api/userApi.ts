import { IUser, RegisterUserRequest } from "dtos";
import api from "./index";

async function registerUser(userData: RegisterUserRequest) {
  const res = await api.post<IUser>("/users", userData);
  return res.data;
}
async function deleteUser() {
  const res = await api.delete("/users");
  return res.data;
}

async function getProfile(userId: string) {
  const res = await api.get<IUser>(`/users/${userId}`);

  return res;
}

async function followUser(userId: string, othUserId: string) {
  const res = await api.post<IUser>(`/users/${userId}/following`, { othUserId });

  return res;
}

async function unfollowUser(userId: string, othUserId: string) {
  const res = await api.patch<IUser>(`/users/${userId}/following`, { othUserId });

  return res;
}

export { registerUser, deleteUser, getProfile, followUser, unfollowUser };
