import { sign } from "jsonwebtoken";
import { resolve } from "path";
import TokenModel from "../models/tokens";

require("dotenv").config({ path: resolve(__dirname, "./.env") });

function generateTokens(payload: any) {
  const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "5m" });
  const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

  return {
    accessToken,
    refreshToken,
  };
}

async function storeRefreshToken(userId: string, refreshToken: string) {
  const tokenData = await TokenModel.findOneAndUpdate({ userId }, { refreshToken });

  if (tokenData === null) return TokenModel.create({ userId, refreshToken });
  return tokenData;
}

async function deleteRefreshToken(userId: string) {
  const token = await TokenModel.findOneAndDelete({ userId });
  return token;
}

export default {
  generateTokens,
  storeRefreshToken,
  deleteRefreshToken,
};
