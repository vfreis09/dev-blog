import dotenv from "dotenv";

dotenv.config();

interface GoogleTokensResult {
  access_token: string | undefined;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id_token: string | undefined;
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

const middlewares = {
  getGoogleOauthTokens,
  getGoogleUser,
};

export default middlewares;
