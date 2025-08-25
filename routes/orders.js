var express = require("express");
var router = express.Router();
const ordersSchema = require("../data/ordersSchema");
const orders = require("../models/Orders");

// Lấy danh sách đơn hàng
router.get("/", async function (req, res, next) {
  try {
    const orderList = await orders
      .find({})
    if (orderList.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
});

//get all with detail
router.get("/detail", async function (req, res, next) {
  try {
    const orderList = await orders
      .find({})
      .populate("customerId")
      .populate("employeeId");
    if (orderList.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
});


// get all with status = completed
router.get("/question9/:status", async function (req, res, next) {
  try {
    const status = req.params.status;
    const orderList = await orders
      .find({
        $expr: {
          $eq:[status, "$status" ]
        }
      })
    if (orderList.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).send("Error fetching orders: " + error.message);
  }
});

module.exports = router;
