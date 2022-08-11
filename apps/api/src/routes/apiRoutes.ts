import express from "express";

import apiController from "../controllers/apiController";

const router = express.Router();

router.get("/image/:id", apiController.getImage);

export default router;
