
require("dotenv").config();
const express = require("express");
const pool = require("./db/db"); 

const app = express();


app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Bienvenido a ModaShop API");
});


app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Conexión exitosa a PostgreSQL", time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al conectar con la base de datos" });
  }
});


const PORT = process.env.PORT || 4000;
const productRoutes = require("./routes/productRoutes");

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
