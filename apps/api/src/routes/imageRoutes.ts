import express from "express";

import apiController from "../controllers/imageController";

const router = express.Router();

router.get("/:id", apiController.getImage);

export default router;
