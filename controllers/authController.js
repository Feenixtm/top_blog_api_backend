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


/* Login JWT

*/

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

        const user = { username: username, password: hashedPassword };

        // New JWT Code (Below)
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_TOKEN);


        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: "production",
            sameSite: "strict",
            maxAge: 3600000
        });

        return res.status(200).json({ message:"Login was successful! Enjoy your tokens!", accessToken: accessToken, refreshToken: refreshToken });

    } catch (error) {
        next(error);
    }
};


function generateAccessToken(user) {
    return jwt.sign(user, process.env.JWT_ACCESS_TOKEN, { expiresIn: '30s' });
}