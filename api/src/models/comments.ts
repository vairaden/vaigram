import { model, Schema, Types } from "mongoose";

interface IMongoComment {
  id: Types.ObjectId;
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IMongoComment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    post: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "posts",
    },
    content: {
      type: String,
      required: true,
      default: "",
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    dislikes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.set("toJSON", {
  virtuals: true,
});

const CommentModel = model<IMongoComment>("comments", CommentSchema);
export default CommentModel;
