import { model, Schema, Types } from "mongoose";

interface IMongoPost {
  id: Types.ObjectId;
  author: Types.ObjectId;
  description: string;
  image: string;
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IMongoPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    image: {
      type: String,
      required: true,
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

PostSchema.set("toJSON", {
  virtuals: true,
});

const PostModel = model<IMongoPost>("posts", PostSchema);
export default PostModel;
