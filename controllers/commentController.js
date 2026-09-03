import { prisma } from "../lib/prisma.js";

// V.1 UNSURE ABOUT VARIABLES + :ID
export const createComment = async (req, res, next) => {
    try {
        const content = req.body.content;
        const userId = req.body.userId;
        const blogPostId = req.body.blogPostId;

        const newComment = await prisma.comment.create({
            data: {
                content: content,
                userId: userId,
                blogPostId: blogPostId 
            }
        });

        res.json({ message: "Comment successfully created!", comment: newComment });

    } catch (error) {
        next(error);
    }
};

export const updateComment = async (req, res, next) => {
    try {
        const commentId = Number(req.params.id);
    
        const content = req.body.content;

        const updatedComment = await prisma.comment.update({
            where: {
                id: commentId
            },
            data: {
                content: content
            }
        });

        res.json({ message: "Successfully updated comment!", comment: updatedComment });
    } catch (error) {
        next(error);
    }
};


export const deleteComment = async (req, res, next) => {
    try {
        const commentId = Number(req.params.id);

        await prisma.comment.delete({
            where: {
                id: commentId
            }
        });

        res.json({ message: "Successfully deleted comment!" });
    } catch (error) {
        next(error);
    }
};
