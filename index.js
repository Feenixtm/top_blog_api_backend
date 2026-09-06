import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import blogRouter from "./routes/blogRouter.js";
import commentRouter from "./routes/commentRouter.js";
import authRouter from "./routes/authRouter.js";

import * as authMiddleware from "./middleware/authMiddleware.js";

const app = express();

app.use(cors());

// Read JSON + Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

app.get("/secret", authMiddleware.authenticateToken, (req, res) => {
    res.json({ message: "You have been properly authenticated!" });
})

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("An error occurred when trying to start up the server: ", error);
    }

    console.log("Listening to Port:", PORT);
})