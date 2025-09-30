const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ModaShop",
  password: "Franzsq123",   
  port: 5432,
});

pool.connect()
  .then(() => console.log(" Conectado a PostgreSQL"))
  .catch(err => console.error(" Error al conectar a PostgreSQL:", err));

module.exports = pool;

