const orderModel = require("../models/orderModel");
const pool = require("../db/db");


async function createOrder(req, res) {
  try {
    
    const cart = await pool.query(
      "SELECT * FROM carts WHERE user_id=$1",
      [req.user.id]
    );

    if (cart.rows.length === 0)
      return res.status(400).json({ error: "Carrito vacío" });

   
    const order = await orderModel.createOrder(req.user.id);

    
    const items = cart.rows.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price || 0
    }));
    await orderModel.addOrderItems(order.id, items);

    
    await pool.query("DELETE FROM carts WHERE user_id=$1", [req.user.id]);

    res.status(201).json({ message: "Orden creada", orderId: order.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getOrders(req, res) {
  try {
    const orders = await orderModel.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOrder, getOrders };
