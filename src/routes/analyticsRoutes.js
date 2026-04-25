const express = require("express");
const {
  topProducts,
  salesByDay,
  revenueByCategory
} = require("../controllers/analyticsController");

const router = express.Router();

router.get("/top-products", topProducts);
router.get("/sales-by-day", salesByDay);
router.get("/revenue-by-category", revenueByCategory);

module.exports = router;
