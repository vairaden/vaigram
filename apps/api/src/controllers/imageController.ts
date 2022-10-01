import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs/promises";
import path from "path";

const getImage = asyncHandler(async (req: Request, res: Response) => {
  try {
    const filePath = path.join("uploads", req.params.id);
    await fs.access(filePath);
    res.status(200).sendFile(filePath);
  } catch (err: any) {
    const filePath = path.join("uploads", "fallback.png");
    res.status(200).sendFile(filePath);
  }
});

export default { getImage };
