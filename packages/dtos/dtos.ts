export interface RegisterUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  following: string[];
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
