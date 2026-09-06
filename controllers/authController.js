import { prisma } from "../lib/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

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
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
        
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

        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
    
        if (!existingUser) {
            res.json({ error: "Incorrect Username" });
        }

        console.log(existingUser);

        const passwordsMatched = await bcrypt.compare(password, existingUser.password);

        if (!passwordsMatched) {
            res.json({ error: "Incorrect Password" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const accessToken = jwt.sign({ username: username, password: hashedPassword }, process.env.JWT_ACCESS_TOKEN);

        res.json({ accessToken: accessToken });

    } catch (error) {
        next(error);
    }
};
