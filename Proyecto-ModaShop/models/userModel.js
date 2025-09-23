const pool = require("../db/db");
const bcrypt = require("bcrypt");


async function createUser(user) {
  const { name, email, password, role } = user;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role",
    [name, email, hashedPassword, role || "cliente"]
  );
  return result.rows[0];
}


async function getUserByEmail(email) {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
}


async function getUserById(id) {
  const result = await pool.query(
    "SELECT id, name, email, role FROM users WHERE id=$1",
    [id]
  );
  return result.rows[0];
}

module.exports = { createUser, getUserByEmail, getUserById };
