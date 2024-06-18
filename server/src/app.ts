import express from "express";
import initDb from "./models/db";
import router from "./routes/router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initDb()
  .then(() => {
    console.log("Database initialized");
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
  });

app.use(router);
