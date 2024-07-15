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
router.get("/likes/post/:postId", likeController.getPostLike);
router.get("/likes/comment/:commentId", likeController.getCommentLike);
router.post("/likes/post/:postId", likeController.postLike);
router.post("/likes/comment/:commentId", likeController.commentLike);
router.delete("/likes/post/:postId", likeController.deletePostLike);
router.delete("/likes/comment/:commentId", likeController.deleteCommentLike);

//comment routes
router.get("/comments/:postId", commentController.getComment);
router.post("/comments/:postId", commentController.postComment);
router.delete("/comments/:commentId", commentController.deleteComment);

export default router;
