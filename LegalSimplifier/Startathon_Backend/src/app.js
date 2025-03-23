import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   }),
// );

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend origin
    credentials: true, // Allow cookies/auth headers
  }),
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));

app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";
import generateSimplify from "./routes/openai.routes.js";
import generateSpeech from "./routes/tts.routes.js";
import translate from "./routes/translate.routes.js";
// import videoRouter from "./routes/video.routes.js";
// import profileRouter from "./routes/profile.routes.js";
// import generateDocument from "./routes/document.routes.js";
// import remainderRouter from "./routes/remainder.routes.js";
// import remaindersRouter from "./routes/remainders.routes.js";
// import sendEmail from "./routes/share.routes.js";
// import healthRecordRoute from "./routes/healthRecord.routes.js";
// import generateDiet from "./routes/diet.routes.js";
// import generateExercise from "./routes/excercise.routes.js";
// import community from "./routes/community.routes.js";
// import post from "./routes/post.routes.js"

// // // routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/simplify", generateSimplify);
app.use("/api/v1/voice", generateSpeech);
app.use("/api/v1/translate", translate);
// app.use("/api/v1/video-generator", videoRouter);
// app.use("/api/v1/profile", profileRouter);
// app.use("/api/v1/document", generateDocument);
// app.use("/api/v1/remainder", remainderRouter);
// app.use("/api/v1/remainders", remaindersRouter);
// app.use("/api/v1/health-data", healthRecordRoute);
// app.use("/api/v1/diet", generateDiet);
// app.use("/api/v1/share", sendEmail);
// app.use("/api/v1/exercise", generateExercise);
// app.use("/api/v1/community", community);
// app.use("/api/v1/post", post);
// app.use("/api/v1/report", reportRouter)

// app.use("/api/v1/allergy", allergyRouter)
// app.use("/api/v1/schedule", scheduleRouter)

export { app };