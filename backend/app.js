import express from "express";
const app = express();
const PORT = process.env.PORT || 5000;
import cors from "cors";

import { connectDB } from "./config/mongoose-connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
connectDB();

import authRoute from "./routes/authRouter.js";

app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from the client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(cookieParser()); // Allows to parse cookies in response from res.cookies.<name>
app.use(express.json()); // Allows to parse incoming requests from req.body

app.use("/api/auth", authRoute);
 
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
}); 