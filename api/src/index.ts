import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import errorHandler from "./middlewares/errorMiddleware";

import commentRoutes from "./routes/commentRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import followRoutes from "./routes/followRoutes";
import prisma from "./prisma";

dotenv.config();

const port = process.env.PORT || 3001;

const app = express();

app.use(morgan("combined"));
app.use(fileUpload());
app.use(cors({ origin: "http://localhost", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());

// app.use("/images", express.static("/uploads"));

app.use("/api/users", userRoutes);
app.use("/api/users", followRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

prisma.$connect();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
