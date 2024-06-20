import { Request, Response } from "express";
const pool = require("../config/dbConfig");

const createPost = async (req: Request, res: Response) => {};

const postController = {
  createPost,
};

export default postController;
