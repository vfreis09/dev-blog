import { Request, Response, NextFunction } from "express";
const pool = require("../config/dbConfig");
import dotenv from "dotenv";

dotenv.config();

interface GoogleTokensResult {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
  user_id: number;
}

async function getGoogleOauthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult | undefined> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
    grant_type: "authorization_code",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(values),
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data: GoogleTokensResult = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult | undefined> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data: GoogleUserResult = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const isAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = parseInt(req.params.id);

  if (!req.session || !req.session.user || !req.session.user.user_id) {
    return res
      .status(401)
      .json({ message: "You need to log in to perform this action" });
  }

  const userId = req.session.user.user_id;

  try {
    const post = await pool.query("SELECT author_id FROM posts WHERE id = $1", [
      postId,
    ]);
    if (post.rows.length === 0) {
      return res.status(404).send("Post not found");
    }

    if (post.rows[0].author_id !== userId) {
      return res.status(403).send("Unauthorized");
    }

    next();
  } catch (error) {
    console.error("Error checking authorization:", error);
    res.status(500).send("Server error");
  }
};

const middlewares = {
  isAuthorized,
  getGoogleOauthTokens,
  getGoogleUser,
};

export default middlewares;
