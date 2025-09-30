const pool = require("../db/db");


async function createOrder(userId) {
  const result = await pool.query(
    "INSERT INTO orders (user_id) VALUES ($1) RETURNING *",
    [userId]
  );
  return result.rows[0];
}


async function addOrderItems(orderId, items) {
  const queries = items.map(item => 
    pool.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
      [orderId, item.product_id, item.quantity, item.price]
    )
  );
  await Promise.all(queries);
  return { message: "Productos agregados a la orden" };
}


async function getOrdersByUser(userId) {
  const result = await pool.query(
    `SELECT o.id, o.status, o.created_at, oi.product_id, oi.quantity, oi.price, p.name
     FROM orders o
     JOIN order_items oi ON o.id = oi.order_id
     JOIN products p ON oi.product_id = p.id
     WHERE o.user_id=$1`,
    [userId]
  );
  return result.rows;
}

module.exports = { createOrder, addOrderItems, getOrdersByUser };
