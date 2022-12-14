import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorMiddleware";

import commentRoutes from "./routes/commentRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

require("dotenv").config();

const port = process.env.PORT || 3001;

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.use(morgan("combined"));
app.use(cors({ origin: "http://localhost", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/images", express.static("/uploads"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`);
});
