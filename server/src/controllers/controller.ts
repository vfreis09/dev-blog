import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import middlewares from "../middlewares/middleware";
import { pool } from "../config/dbConfig";

const home = (req: Request, res: Response) => {
  res.send("hello world!");
};

const googleOauthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const tokens = await middlewares.getGoogleOauthTokens({ code });

    if (!tokens || !tokens.id_token || !tokens.access_token) {
      return res.status(400).json({ error: "Failed to retrieve OAuth tokens" });
    }

    const { id_token, access_token } = tokens;

    const googleUser = await middlewares.getGoogleUser({
      id_token,
      access_token,
    });

    if (googleUser) {
      const { id, email, name, picture } = googleUser;
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE google_id = $1",
        [id]
      );

      if (rows.length === 0) {
        await pool.query(
          "INSERT INTO users (google_id, email, name, picture) VALUES ($1, $2, $3, $4)",
          [id, email, name, picture]
        );
      }
    }

    //create a session with jwt

    res.redirect("/");
  } catch (error) {
    console.error("Error in googleOauthHandler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const controller = {
  home,
  googleOauthHandler,
};

export default controller;
