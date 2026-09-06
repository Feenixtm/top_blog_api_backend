import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    
    if (token === null) {
        // res.sendStatus(401);
        res.json({ error: "Authentication failed. Token doesn't exist." });
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, user) => {
        if (error) {
            // return res.sendStatus(401);
            return res.json({ 
                error: "Authentication failed. Token failed verification.", 
                token: token,
                jwtAccessToken: process.env.JWT_ACCESS_TOKEN,
            });
        }

        req.user = user;
        next();
    })
}