var express = require("express");
var router = express.Router();
const ordersSchema = require("../data/ordersSchema");
const orders = require("../models/Orders");

// Lấy danh sách đơn hàng
router.get("/", async function (req, res, next) {
  try {
    const orderList = await orders
      .find({})
      .populate("customer")
      .populate("employee");
    if (orderList.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
});

module.exports = router;
