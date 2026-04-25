const mongoose = require("mongoose");
const Order = require("../models/Order");

const getRecommendations = async (req, res) => {
  const { userId } = req.params;

  const pipeline = [
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        totalPurchased: { $sum: "$items.quantity" }
      }
    },
    { $sort: { totalPurchased: -1 } },
    { $limit: 5 }
  ];

  const results = await Order.aggregate(pipeline);
  res.json(results);
};

module.exports = { getRecommendations };
