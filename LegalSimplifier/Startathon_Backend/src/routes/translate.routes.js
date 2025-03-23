import { Router } from "express";
// import { generateParameters } from "../controllers/openai.controller.cjs";
import pkg from "../controllers/translate.controller.cjs";
import { upload } from "../middlewares/multer.middleware.js";

const { translateText } = pkg;

const router = Router();

router.route("/translate").post(translateText);

// router.route("/create")
//   .post(upload.single("pdfFile"), verifyJWT, createReport);

export default router;