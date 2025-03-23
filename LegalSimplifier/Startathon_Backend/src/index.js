// require('dotenv').config({path : './env'})
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is runing at : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed !!", error);
  });