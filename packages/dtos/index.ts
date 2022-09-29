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

export interface IProfile {
  id: string;
  profilePicture: string | null;
  username: string;
  firstName: string;
  lastName: string;
  following: string[];
  createdAt: Date;
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

export interface IComment {
  id: string;
  author: {
    id: string;
    profilePicture: string | null;
    username: string;
  };
  post: {
    id: string;
  };
  content: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}
