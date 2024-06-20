import { Router } from "express";
import postController from "../controllers/postController";

const router = Router();

router.post("/", postController.createPost);

export default router;
