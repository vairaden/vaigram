import express from "express";

import protect from "../middlewares/authMiddleware";
import {
  getFollowers,
  getFollowing,
  followUser,
  unfollowUser,
} from "../controllers/followController";

const followRoutes = express.Router();

followRoutes.get("/:userId/followers", getFollowers);

followRoutes.get("/:userId/following", getFollowing);

followRoutes.post("/:othUserId/follow", protect, followUser);

followRoutes.post("/:othUserId/unfollow", protect, unfollowUser);

export default followRoutes;
