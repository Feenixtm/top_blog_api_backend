import express from "express";
import * as blogController from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/create", blogController.createBlog);
blogRouter.get("/:id", blogController.getBlog);
blogRouter.put("/update/:id", blogController.updateBlog);
blogRouter.delete("/delete/:id", blogController.deleteBlog);

export default blogRouter;