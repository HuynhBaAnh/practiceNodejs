var express = require("express");
var router = express.Router();
const suppliersSchema = require("../data/suppliersSchema");
const suppliers = require("../models/Suppliers");

router.get("/", async function (req, res, next) {
  try {
    const supplierList = await suppliers.find({});
    if (supplierList.length === 0) {
      return res.status(404).json({ message: "No suppliers found" });
    }
    res.status(200).json(supplierList);
  } catch (error) {
    console.error("Error in suppliers route:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
