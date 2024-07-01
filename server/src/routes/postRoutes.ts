import { Router } from "express";
import postController from "../controllers/postController";
import likeController from "../controllers/likeController";
import commentController from "../controllers/commentController";
import middlewares from "../middlewares/middleware";

const router = Router();

//post routes
router.post("/posts", postController.createPost);
router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", middlewares.isAuthorized, postController.updatePost);
router.delete(
  "/posts/:id",
  middlewares.isAuthorized,
  postController.deletePost
);

//like routes
router.get("/posts/:id", likeController.getLike);
router.post("/posts/:id", likeController.postLike);
router.delete("/posts/:id", likeController.deleteLike);

//comment routes
router.get("/posts/:id", commentController.getComment);
router.post("/posts/:id", commentController.postComment);
router.delete("/posts/:id", commentController.deleteComment);

export default router;
