import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import prisma from "../prisma";

const protect = expressAsyncHandler(async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer"))
      throw new Error("No authorization header");

    const token = req.headers.authorization.split(" ")[1];
    if (!token) throw new Error("No access token");

    const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as { userId: number };

    await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    req.userId = userId;

    next();
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default protect;
