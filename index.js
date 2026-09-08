import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import blogRouter from "./routes/blogRouter.js";
import commentRouter from "./routes/commentRouter.js";
import authRouter from "./routes/authRouter.js";

import * as authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Read JSON + Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allows parsing of cookies
app.use(cookieParser());

// Talk to different ports. E.g. Front-end + allow sending and receiving of cookies
app.use(cors({
    credentials: true
}));

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

// -----------------------------------

// TEST ROUTES FOR JWT

app.get("/secret", authMiddleware.authenticateToken, (req, res) => {
    res.json({ message: "You have been properly authenticated!" });
})

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
})

// -----------------------------------

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("An error occurred when trying to start up the server: ", error);
    }

    console.log("Listening to Port:", PORT);
})