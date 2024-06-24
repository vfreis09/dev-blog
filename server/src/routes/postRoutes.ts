import { Router } from "express";
import postController from "../controllers/postController";
import middlewares from "../middlewares/middleware";

const router = Router();

router.post("/", postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", middlewares.isAuthorized, postController.updatePost);
router.delete("/:id", middlewares.isAuthorized, postController.deletePost);

export default router;
