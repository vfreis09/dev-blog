import { Request, Response } from "express";
const pool = require("../config/dbConfig");

const getComment = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  try {
    const comments = await pool.query(
      `
      SELECT comments.id, comments.content, comments.author_id, users.name as author_name, users.picture AS author_picture 
      FROM comments
      JOIN users ON comments.author_id = users.id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at DESC
    `,
      [postId]
    );
    res.json(comments.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const postComment = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const authorId = req.session.user.user_id;
  const { content } = req.body;
  await pool.query(
    "INSERT INTO comments (post_id, author_id, content) VALUES ($1, $2, $3)",
    [postId, authorId, content]
  );
  res.sendStatus(201);
};

const deleteComment = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.commentId);
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
