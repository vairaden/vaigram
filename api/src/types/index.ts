export interface IUser {
  id: string;
  profilePicture: string | null;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  accessToken: string;
}

export interface IPost {
  id: string;
  author: {
    id: string;
    profilePicture: string | null;
    username: string;
  };
  description: string;
  image: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}
