const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const recommendationRoutes = require("./recommendationRoutes");
const analyticsRoutes = require("./analyticsRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/recommendations", recommendationRoutes);
router.use("/analytics", analyticsRoutes);

module.exports = router;
