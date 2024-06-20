const pool = require("../config/dbConfig");

const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(255)
);

  CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

  try {
    await pool.query(createTableQuery);
    console.log("Users table created successfully or already exists.");
  } catch (err) {
    console.error("Error creating users table:", err);
  }
};

export default initDb;
