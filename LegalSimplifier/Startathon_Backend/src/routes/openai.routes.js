import { Router } from "express";
// import { generateParameters } from "../controllers/openai.controller.cjs";
import pkg from "../controllers/openai.controller.cjs";
import { upload } from "../middlewares/multer.middleware.js";

const { generateSimplify } = pkg;

const router = Router();

router.route("/generate-simplyfy").post(upload.single("pdfFile"),generateSimplify);

// router.route("/create")
//   .post(upload.single("pdfFile"), verifyJWT, createReport);

export default router;