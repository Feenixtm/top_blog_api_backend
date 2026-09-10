import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import blogRouter from "./routes/blogRouter.js";
import commentRouter from "./routes/commentRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

// Read JSON + Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows parsing of cookies
app.use(cookieParser());

// Talk to different ports. E.g. Front-end + allow sending and receiving of cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

// -----------------------------------

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("An error occurred when trying to start up the server: ", error);
    }

    console.log("Listening to Port:", PORT);
})