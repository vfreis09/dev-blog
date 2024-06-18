const pool = require("../config/dbConfig");

const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    picture VARCHAR(255);`;

  try {
    await pool.query(createTableQuery);
    console.log("Users table created successfully or already exists.");
  } catch (err) {
    console.error("Error creating users table:", err);
  } finally {
    await pool.end();
  }
};

export default initDb;
