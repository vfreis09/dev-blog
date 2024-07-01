import { Request, Response } from "express";
const pool = require("../config/dbConfig");

const getComment = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { rows } = await pool.query(
    "SELECT * FROM comments WHERE post_id = $1",
    [postId]
  );
  res.json(rows);
};

const postComment = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const authorId = req.session.user.user_id;
  const { content } = req.body;
  await pool.query(
    "INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3)",
    [postId, authorId, content]
  );
  res.sendStatus(201);
};

const deleteComment = async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const authorId = req.session.user.user_id;
  await pool.query("DELETE FROM comments WHERE id = $1 AND author_id = $2", [
    commentId,
    authorId,
  ]);
  res.sendStatus(204);
};

const commentController = {
  getComment,
  postComment,
  deleteComment,
};

export default commentController;
