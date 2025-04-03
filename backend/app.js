import express from "express";
import { connectDB } from "./config/mongoose-connection.js";
import dotenv from "dotenv";
dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("Running...");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
}); 