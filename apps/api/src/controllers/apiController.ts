import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import fs from "fs/promises";
import path from "path";

const getImage = asyncHandler(async (req: Request, res: Response) => {
  const filePath = path.join(__dirname, "..", "data", "images", req.params.id);
  try {
    await fs.access(filePath);
    res.status(200).sendFile(filePath);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default { getImage };
