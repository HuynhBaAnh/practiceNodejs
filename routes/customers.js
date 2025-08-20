var express = require("express");
var router = express.Router();
const customersSchema = require("../data/customersSchema");

const customers = require("../models/Customers");

// Lấy danh sách khách hàng
router.get("/", async function (req, res) {
  try {
    const customerList = await customers.find({});
    if (customerList.length === 0) {
      return res.status(404).json({ message: "No customers found" });
    }
    res.status(200).json(customerList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customers: " + error.message });
  }
});

// Thêm khách hàng mới
router.post("/", async function (req, res) {
  try {
    await customersSchema.validate(req.body);
    const newCustomer = new customers(req.body);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding customer: " + error.message });
  }
});

// Xoá khách hàng theo ID
router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const foundCustomer = await customers.findByIdAndDelete(id);
    if (!foundCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer: " + error.message });
  }
});

module.exports = router;
