import { Router } from "express";
import controller from "../controllers/controller";

const router = Router();

router.get("/", controller.home);

router.get("/api/user", controller.getUser);

router.get("/api/sessions/oauth/google", controller.googleOauthHandler);

export default router;
