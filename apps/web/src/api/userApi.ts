import { IUser, IProfile } from "dtos";
import { z } from "zod";
import { registerValidator } from "validators";
import api from "./index";

async function registerUser(userData: z.infer<typeof registerValidator>) {
  const res = await api.post<IUser>("/users", userData);
  sessionStorage.setItem("accessToken", res.data.accessToken);

  return res.data;
}
async function deleteUser() {
  const res = await api.delete("/users");
  sessionStorage.removeItem("accessToken");

  return res.data;
}

async function getProfile(userId: string) {
  const res = await api.get<IProfile>(`/users/${userId}`);

  return res.data;
}

async function setProfilePicture(userId: string, data: FormData) {
  const res = await api.post<IProfile>(`/users/${userId}/profile_picture`, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

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

export { registerUser, deleteUser, getProfile, setProfilePicture, followUser, unfollowUser };
