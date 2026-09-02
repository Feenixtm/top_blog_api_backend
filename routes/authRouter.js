import express from "express";
import * as authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/login", authController.login);

export default authRouter;