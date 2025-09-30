const pool = require("../db/db");


async function getAllProducts() {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
}


async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
}


async function createProduct(product) {
  const { name, price, size, color, category, stock } = product;
  const result = await pool.query(
    "INSERT INTO products (name, price, size, color, category, stock) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [name, price, size, color, category, stock]
  );
  return result.rows[0];
}


async function updateProduct(id, product) {
  const { name, price, size, color, category, stock } = product;
  const result = await pool.query(
    "UPDATE products SET name=$1, price=$2, size=$3, color=$4, category=$5, stock=$6 WHERE id=$7 RETURNING *",
    [name, price, size, color, category, stock, id]
  );
  return result.rows[0];
}


async function deleteProduct(id) {
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
  return { message: "Producto eliminado correctamente" };
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
