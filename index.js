import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRouter.js";
import commentRouter from "./routes/commentRouter.js";
import authRouter from "./routes/authRouter.js";
dotenv.config();

const app = express();

app.use(cors());

// Read JSON + Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
app.use("/comments", commentRouter);

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("An error occurred when trying to start up the server: ", error);
    }

    console.log("Listening to Port:", PORT);
})