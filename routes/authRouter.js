import express from "express";
import * as authController from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/sign-up", authController.postSignUp);
authRouter.post("/login", authController.postLogin);

authRouter.get("/login", authenticateToken, authController.getLogin);
authRouter.post("/log-out", authController.postLogOut);

export default authRouter;