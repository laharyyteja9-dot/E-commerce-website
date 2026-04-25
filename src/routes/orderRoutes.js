const express = require("express");
const { listOrders, createOrder } = require("../controllers/orderController");

const router = express.Router();

router.get("/", listOrders);
router.post("/", createOrder);

module.exports = router;
