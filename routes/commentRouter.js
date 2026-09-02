import express from "express";
import * as commentController from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.get("/:id", commentController.createComment);
commentRouter.get("/:id", commentController.getComment);
commentRouter.get("/:id", commentController.updateComment);
commentRouter.get("/:id", commentController.deleteComment);

export default commentRouter;