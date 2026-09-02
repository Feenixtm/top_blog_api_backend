import express from "express";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRouter";
import commentRouter from "./routes/commentRouter";
import authRouter from "./routes/authRouter";
dotenv.config();

const app = express();

// Read JSON + Form Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/comment", commentRouter);

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("An error occurred when trying to start up the server: ", error);
    }

    console.log("Listening to Port:", PORT);
})