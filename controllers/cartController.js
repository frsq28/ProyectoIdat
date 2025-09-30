const cartModel = require("../models/cartModel");


async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const cartItem = await cartModel.addToCart(req.user.id, productId, quantity);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getCart(req, res) {
  try {
    const cart = await cartModel.getCartByUser(req.user.id);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function removeFromCart(req, res) {
  try {
    const result = await cartModel.removeFromCart(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addToCart, getCart, removeFromCart };
