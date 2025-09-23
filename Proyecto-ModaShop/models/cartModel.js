const pool = require("../db/db");


async function addToCart(userId, productId, quantity) {
  const result = await pool.query(
    "INSERT INTO carts (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *",
    [userId, productId, quantity]
  );
  return result.rows[0];
}


async function getCartByUser(userId) {
  const result = await pool.query(
    `SELECT c.id, c.quantity, p.name, p.price, p.size, p.color
     FROM carts c
     JOIN products p ON c.product_id = p.id
     WHERE c.user_id=$1`,
    [userId]
  );
  return result.rows;
}


async function removeFromCart(cartId) {
  await pool.query("DELETE FROM carts WHERE id=$1", [cartId]);
  return { message: "Producto eliminado del carrito" };
}

module.exports = { addToCart, getCartByUser, removeFromCart };
