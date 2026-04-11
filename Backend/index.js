import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import seedAdmin from "./controllers/admin.controller.js";
import userRouter from "./routes/user.route.js"

dotenv.config();
const App = express();
App.use(express.json());
App.use(cors());
App.use(cookieParser());

const port = process.env.PORT || 3002
const URI = process.env.MONGODB_URI

try {
  mongoose.connect(URI);
  console.log("Zenith connected to mongoose db..");
   await seedAdmin(); 
} catch (error) {
  console.log(error);
}

App.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Mental Health Tracker Back End REST API!",
  });
});

App.use("/api/user",userRouter);


App.listen(port,()=>{
    console.log(`Web backend run on this port http://localhost:${port}`)
});