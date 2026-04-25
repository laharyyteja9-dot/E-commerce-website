require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { connectDb } = require("../src/config/db");
const User = require("../src/models/User");
const Product = require("../src/models/Product");
const Order = require("../src/models/Order");

const randomChoice = (items) => items[Math.floor(Math.random() * items.length)];

const createUsers = async () => {
  const segments = ["new", "returning", "vip"];
  const users = [];

  // Add demo users with hashed passwords
  const demoUsers = [
    { name: "Demo User", email: "demo@example.com", password: "demo123", segment: "vip" },
    { name: "Test User", email: "test@example.com", password: "test123", segment: "new" }
  ];

  for (const demoUser of demoUsers) {
    const hashedPassword = await bcrypt.hash(demoUser.password, 10);
    users.push({
      name: demoUser.name,
      email: demoUser.email,
      password: hashedPassword,
      segment: demoUser.segment
    });
  }

  // Add 48 more random users
  for (let i = 1; i <= 48; i += 1) {
    const hashedPassword = await bcrypt.hash(`password${i}`, 10);
    users.push({
      name: `User ${i}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      segment: randomChoice(segments)
    });
  }

  return User.insertMany(users);
};

const createProducts = async () => {
  const categories = ["Electronics", "Home", "Fashion", "Books", "Toys"];
  const descriptions = [
    "High quality premium product",
    "Best seller in its category",
    "Great value for money",
    "Professional grade equipment",
    "Perfect for everyday use",
    "Limited edition item",
    "Eco-friendly and sustainable",
    "Award winning design"
  ];
  const products = [];

  for (let i = 1; i <= 80; i += 1) {
    products.push({
      name: `Product ${i}`,
      category: randomChoice(categories),
      price: Number((Math.random() * 200 + 10).toFixed(2)),
      description: randomChoice(descriptions),
      image: `https://via.placeholder.com/300x300?text=Product+${i}`,
      stock: Math.floor(Math.random() * 100) + 5,
      tags: ["popular", "featured"].filter(() => Math.random() > 0.5),
      isActive: true
    });
  }

  return Product.insertMany(products);
};

const createOrders = async (users, products) => {
  const statuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
  const orders = [];

  for (let i = 0; i < 200; i += 1) {
    const items = [];
    const itemsCount = Math.floor(Math.random() * 4) + 1;

    for (let j = 0; j < itemsCount; j += 1) {
      const product = randomChoice(products);
      const quantity = Math.floor(Math.random() * 3) + 1;
      items.push({
        productId: product._id,
        quantity,
        priceAtPurchase: product.price
      });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.priceAtPurchase * item.quantity,
      0
    );

    orders.push({
      userId: randomChoice(users)._id,
      status: randomChoice(statuses),
      items,
      totalAmount: Number(totalAmount.toFixed(2)),
      createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30)
    });
  }

  return Order.insertMany(orders);
};

const run = async () => {
  const connection = await connectDb(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  const users = await createUsers();
  const products = await createProducts();
  await createOrders(users, products);

  await connection.close();
  console.log("Seed data inserted");
};

run().catch((error) => {
  console.error(error);
  mongoose.connection.close();
  process.exit(1);
});
