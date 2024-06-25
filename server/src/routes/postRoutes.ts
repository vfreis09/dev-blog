import { Router } from "express";
import postController from "../controllers/postController";
import middlewares from "../middlewares/middleware";

const router = Router();

router.post("/posts", postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", middlewares.isAuthorized, postController.updatePost);
router.delete(
  "/posts/:id",
  middlewares.isAuthorized,
  postController.deletePost
);

export default router;
