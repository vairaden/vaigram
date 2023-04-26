import { sign } from "jsonwebtoken";
import prisma from "../prisma";

function generateTokens(payload: any) {
  const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" });

  return {
    accessToken,
    refreshToken,
  };
}

async function storeRefreshToken(userId: number, refreshToken: string) {
  const token = await prisma.token.findFirstOrThrow({ where: { userId } });
  const tokenData = await prisma.token.upsert({
    where: { id: token.id },
    update: { refreshToken },
    create: {
      userId,
      refreshToken,
    },
  });

  return tokenData;
}

async function deleteRefreshToken(userId: number) {
  const { count } = await prisma.token.deleteMany({ where: { userId } });
  return count;
}

export { generateTokens, storeRefreshToken, deleteRefreshToken };
