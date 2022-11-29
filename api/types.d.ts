export {};

interface IUser {
  id: string;
  profilePicture: string | null;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  accessToken: string;
}

interface IPost {
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

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      postId?: string;
      commentId?: string;
    }

    interface Response {
      user?: IUser;
      post?: IPost;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      JWT_ACCESS_SECRET: string;
      JWT_REFRESH_SECRET: string;
      MONGO_URI: string;
    }
  }
}
