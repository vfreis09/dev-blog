import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/api/user", userController.getUser);

router.get("/api/sessions/oauth/google", userController.googleOauthHandler);

router.post("/api/logout", userController.logoutHandler);

export default router;
