require("dotenv").config();
const mongoose = require("mongoose");
const { connectDb } = require("../src/config/db");
const User = require("../src/models/User");
const Product = require("../src/models/Product");
const Order = require("../src/models/Order");

const run = async () => {
  const connection = await connectDb(process.env.MONGODB_URI);

  await User.collection.createIndex({ email: 1 }, { unique: true });
  await User.collection.createIndex({ segment: 1, createdAt: -1 });

  await Product.collection.createIndex({ category: 1, price: 1 });
  await Product.collection.createIndex({ tags: 1 });

  await Order.collection.createIndex({ userId: 1, createdAt: -1 });
  await Order.collection.createIndex({ status: 1, createdAt: -1 });
  await Order.collection.createIndex({ "items.productId": 1 });

  await connection.close();
  console.log("Indexes created");
};

run().catch((error) => {
  console.error(error);
  mongoose.connection.close();
  process.exit(1);
});
