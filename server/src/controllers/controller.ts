import { Request, Response } from "express";
import getGoogleOauthTokens from "../middlewares/middleware";

const home = (req: Request, res: Response) => {
  res.send("hello world!");
};

const googleOauthHandler = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    const tokens = await getGoogleOauthTokens({ code });

    if (!tokens) {
      return res.status(400).json({ error: "Failed to retrieve OAuth tokens" });
    }

    const { id_token, access_token } = tokens;

    // Continue processing with id_token and access_token
    res.status(200).json({ id_token, access_token });
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
