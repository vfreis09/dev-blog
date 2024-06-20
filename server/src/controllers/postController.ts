import { Request, Response } from "express";
const pool = require("../config/dbConfig");

const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const authorId = req.session.user.id;
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

const getPosts = async (req: Request, res: Response) => {};

const getPostById = async (req: Request, res: Response) => {};

const updatePost = async (req: Request, res: Response) => {};

const deletePost = async (req: Request, res: Response) => {};

const postController = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};

export default postController;
