import express from "express";
import * as blogController from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/:id", blogController.createBlog);
blogRouter.get("/:id", blogController.getBlog);
blogRouter.put("/:id", blogController.updateBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

export default blogRouter;