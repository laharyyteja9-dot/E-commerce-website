const Product = require("../models/Product");

const listProducts = async (req, res) => {
  const products = await Product.find({ isActive: true }).limit(50).lean();
  res.json(products);
};

module.exports = { listProducts };
