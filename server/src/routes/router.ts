import { Router } from "express";
import home from "../controllers/controller";

const router = Router();

const googleOauthRedirectUrl =
  "http://localhost:3000/api/sessions/oauth/google";

router.get("/", home);

export default router;
