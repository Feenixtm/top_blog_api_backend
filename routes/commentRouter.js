import express from "express";
import * as commentController from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/create", commentController.createComment);
commentRouter.put("/update/:id", commentController.updateComment);
commentRouter.delete("/delete/:id", commentController.deleteComment);

export default commentRouter;