import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/user", userController.getUser);

router.get("/sessions/oauth/google", userController.googleOauthHandler);

router.post("/logout", userController.logoutHandler);

export default router;
