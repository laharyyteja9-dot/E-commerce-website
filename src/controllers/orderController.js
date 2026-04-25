const Order = require("../models/Order");

const listOrders = async (req, res) => {
  const orders = await Order.find().limit(50).lean();
  res.json(orders);
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

module.exports = { listOrders, createOrder };
