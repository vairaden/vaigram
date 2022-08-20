import { model, Schema, Types } from "mongoose";

interface IMongoUser {
  id: Types.ObjectId;
  profilePicture: Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  following: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IMongoUser>(
  {
    profilePicture: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    username: {
      type: String,
      required: [true, "Please add username"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "Please add a name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a surname"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    following: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.set("toJSON", {
  virtuals: true,
});

const UserModel = model<IMongoUser>("users", UserSchema);
export default UserModel;
