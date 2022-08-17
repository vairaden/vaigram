import cors from "cors";
import express, { Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorMiddleware";

import imageRoutes from "./routes/imageRoutes";
import commentRoutes from "./routes/commentRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

require("dotenv").config({ path: path.join(__dirname, ".", ".env") });

const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || "";

const app = express();

mongoose.connect(mongoUri);

app.use(cors({ origin: `http://localhost:3000`, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "..", "client")));

app.use("/api/images", imageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes);
app.use("/api/auth", authRoutes);

app.use("*", (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
