import express from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3001
const App = express();

App.listen(port,()=>{
    console.log(`Web backend run on this port http://localhost:${port}`)
});