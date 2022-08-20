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
  likes: number;
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
  post: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
