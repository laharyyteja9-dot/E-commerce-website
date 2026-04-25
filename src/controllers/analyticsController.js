const Order = require("../models/Order");
const {
  topProductsPipeline,
  salesByDayPipeline,
  revenueByCategoryPipeline
} = require("../data/pipelines");

const topProducts = async (req, res) => {
  const results = await Order.aggregate(topProductsPipeline);
  res.json(results);
};

const salesByDay = async (req, res) => {
  const results = await Order.aggregate(salesByDayPipeline);
  res.json(results);
};

const revenueByCategory = async (req, res) => {
  const results = await Order.aggregate(revenueByCategoryPipeline);
  res.json(results);
};

module.exports = { topProducts, salesByDay, revenueByCategory };
