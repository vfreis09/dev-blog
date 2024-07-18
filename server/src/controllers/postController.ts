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
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      `SELECT posts.id AS id, posts.title, posts.content, posts.created_at AS created_at, 
      users.name AS author_name, users.picture AS author_picture 
       FROM posts 
       JOIN users ON posts.author_id = users.id 
       ORDER BY posts.created_at DESC 
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    const totalResult = await pool.query("SELECT COUNT(*) FROM posts");
    const totalPosts = parseInt(totalResult.rows[0].count, 10);

    res.json({
      posts: result.rows,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(
      `SELECT posts.id, posts.title, posts.content, posts.author_id, posts.created_at, users.name AS author_name, users.picture AS author_picture 
       FROM posts
       JOIN users ON posts.author_id = users.id
       WHERE posts.id = $1`,
      [id]
    );

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
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const authorId = req.session.user.user_id;
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
  const id = parseInt(req.params.id);
  const authorId = req.session.user.user_id;
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
