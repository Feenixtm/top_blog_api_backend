import { prisma } from "../lib/prisma.js";

export const createBlog = async (req, res, next) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const authorId = req.body.authorId;
        const isPublished = req.body.isPublished;

        const newBlog = await prisma.blogPost.create({
            data: {
                title: title,
                content: content,
                authorId: authorId,
                isPublished: isPublished
            }
        });

        res.json({ message: "Blog Post successfully created!", newBlog: newBlog });        
    } catch (error) {
        next(error);
    }
};


export const getBlog = async (req, res, next) => {
    try {
        const blogId = Number(req.params.id);

        const existingBlog = await prisma.blogPost.findUnique({
            where: {
                id: blogId
            },
            include: {
                comments: true
            }
        });

        if (existingBlog) {
            res.json({ message: "Blog successfully retrieved!", blog: existingBlog });
        } else {
            res.json({ error: "Blog retrieval failed. This blog doesn't exist." });
        }        

    } catch (error) {
        next(error);
    }
};


export const updateBlog = async (req, res, next) => {
    try {
        const blogId = Number(req.params.id);
        
        const title = req.body.title;
        const content = req.body.content;
        const isPublished = req.body.isPublished;

        const updatedBlog = await prisma.blogPost.update({
            where: {
                id: blogId
            },
            data: {
                title: title,
                content: content,
                isPublished: isPublished
            }
        });

        res.json({ message: "Blog has been successfully updated!", blog: updatedBlog });
    } catch (error) {
        next(error);
    }
};


export const deleteBlog = async (req, res, next) => {
    try {
        const blogId = Number(req.params.id);

        await prisma.blogPost.delete({
            where: {
                id: blogId
            }
        });

        res.json({ message: "Blog Successfully deleted!" });

    } catch (error) {
        next(error);
    }
};
