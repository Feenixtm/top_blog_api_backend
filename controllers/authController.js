import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // See if a user with this username already exists...
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            }
        });

        if (existingUser) {
            res.json({ error: "This username has already been taken. Please try a different username."})
        } else {
            const hashedPassword = await bcrypt.hashedPassword(password, 10);
        
            const newUser = await prisma.user.create({
                data: {
                    username: username,
                    password: hashedPassword,
                    displayName: username,
                    canCreateBlogPosts: false
                }
            });

            res.json({ message:"Successful Sign Up!", user: newUser });
        }
    } catch (error) {
        next(error);
    }
};


export const login = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        // Does user exist? If so, then check if the password matches. If so, then login has been successful.

        // const existingUser = await prisma.user.findUnique({
        //     where: {
        //         username: username
        //     }
        // });

        // Unnecessary? JWT Strategy?

    } catch (error) {
        next(error);
    }
};
