import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5051;

app.listen(PORT, (error) => {
    if (error) {
        console.error("An error occurred when trying to start up the server: ", error);
    }

    console.log("Listening to Port:", PORT);
})