const productModel = require("../models/productModel");


async function getAllProducts(req, res) {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getProductById(req, res) {
  try {
    const product = await productModel.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function createProduct(req, res) {
  try {
    const newProduct = await productModel.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function updateProduct(req, res) {
  try {
    const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function deleteProduct(req, res) {
  try {
    const result = await productModel.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
