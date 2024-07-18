import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import initDb from "./models/db";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const maxAge = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge },
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

initDb()
  .then(() => {
    console.log("Database initialized");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
  });

app.use("/api", userRoutes, postRoutes);

app.get("/", (req, res) => {
  res.redirect("/api/posts");
});
