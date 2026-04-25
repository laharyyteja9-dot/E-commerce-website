const topProductsPipeline = [
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalQuantity: { $sum: "$items.quantity" },
      revenue: { $sum: { $multiply: ["$items.priceAtPurchase", "$items.quantity"] } }
    }
  },
  { $sort: { revenue: -1 } },
  { $limit: 10 }
];

const salesByDayPipeline = [
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      totalOrders: { $sum: 1 },
      totalRevenue: { $sum: "$totalAmount" }
    }
  },
  { $sort: { _id: 1 } }
];

const revenueByCategoryPipeline = [
  { $unwind: "$items" },
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $group: {
      _id: "$product.category",
      revenue: { $sum: { $multiply: ["$items.priceAtPurchase", "$items.quantity"] } }
    }
  },
  { $sort: { revenue: -1 } }
];

module.exports = {
  topProductsPipeline,
  salesByDayPipeline,
  revenueByCategoryPipeline
};
