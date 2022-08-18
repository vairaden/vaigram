/* eslint-disable no-unused-vars */
import { IPost, IUser } from "dtos";

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
