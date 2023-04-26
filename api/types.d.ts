import { IPost, IUser } from "./src/types";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
      // params: {
      //   postId?: number;
      //   commentId?: number;
      // };
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
      // MONGO_URI: string;
    }
  }
}
