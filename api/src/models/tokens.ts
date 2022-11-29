import { model, Schema, Types } from "mongoose";

interface IMongoToken {
  id: Types.ObjectId;
  userId: Types.ObjectId;
  refreshToken: string;
}

const TokensSchema = new Schema<IMongoToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TokensSchema.set("toJSON", {
  virtuals: true,
});

const TokenModel = model<IMongoToken>("tokens", TokensSchema);
export default TokenModel;
