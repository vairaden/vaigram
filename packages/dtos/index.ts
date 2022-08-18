export interface ITokenPayload {
  userId: string;
}

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  accessToken: string;
}

export interface IProfile {
  id: string;
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
    username: string;
  };
  post: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
