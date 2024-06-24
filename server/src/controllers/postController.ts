import { Request, Response } from "express";
const pool = require("../config/dbConfig");

const createPost = async (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }
  const { title, content } = req.body;
  const authorId = req.session.user.user_id;
  try {
    const result = await pool.query(
      "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, authorId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const authorId = req.session.user.id;
  try {
    const result = await pool.query(
      "UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND author_id = $4 RETURNING *",
      [title, content, id, authorId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Post not found or not authorized" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const authorId = req.session.user.id;
  try {
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND author_id = $2 RETURNING *",
      [id, authorId]
    );
    if (result.rows.length > 0) {
      res.json({ message: "Post deleted successfully" });
    } else {
      res.status(404).json({ message: "Post not found or not authorized" });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postController = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};

export default postController;
