import { Request, Response } from "express";
const pool = require("../config/dbConfig");

const getLike = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const { rows } = await pool.query("SELECT * FROM likes WHERE post_id = $1", [
    postId,
  ]);
  res.json(rows);
};

const postLike = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const authorId = req.session.user.user_id;
  await pool.query("INSERT INTO likes (post_id, author_id) VALUES ($1, $2)", [
    postId,
    authorId,
  ]);
  res.sendStatus(201);
};

const deleteLike = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const authorId = req.session.user.user_id;
  await pool.query("DELETE FROM likes WHERE post_id = $1 AND author_id = $2", [
    postId,
    authorId,
  ]);
  res.sendStatus(204);
};

const likeController = {
  getLike,
  postLike,
  deleteLike,
};

export default likeController;
