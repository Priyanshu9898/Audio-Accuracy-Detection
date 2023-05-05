import express from "express";
import { transcribeController } from "../controller/transcribeController.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route("/transcribe").post(upload.single('audio'), transcribeController);

export default router;