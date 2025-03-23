import { Router } from "express";
// import { generateParameters } from "../controllers/openai.controller.cjs";
import pkg from "../controllers/ttsController.cjs";

const { textToSpeech } = pkg;

const router = Router();

router.route("/generateSpeech").post(textToSpeech);

// router.route("/create")
//   .post(upload.single("pdfFile"), verifyJWT, createReport);

export default router;