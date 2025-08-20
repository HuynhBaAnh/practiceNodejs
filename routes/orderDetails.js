var express = require("express");
var router = express.Router();
const orderDetailsSchema = require("../data/orderDetailsSchema");
const orderDetails = require("../models/OrderDetails");

//get list of order details
router.get("/", async function (req, res, next) {
  try {
    const orderDetailsList = await orderDetails
      .find({})
      .populate("orderId")
      .populate("productId");
    if (orderDetailsList.length === 0) {
      return res.status(404).json({ message: "No order details found" });
    }
    res.status(200).json(orderDetailsList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order details: " + error.message });
  }
});

//add new order detail
router.post("/", async function (req, res) {
  try {
    await orderDetailsSchema.validate(req.body);
    const newOrderDetail = new orderDetails(req.body);
    await newOrderDetail.save();
    res.status(201).json(newOrderDetail);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding order detail: " + error.message });
  }
});

module.exports = router;
