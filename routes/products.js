var express = require("express");
var router = express.Router();

// Kết nối đến mongoose model Products
const products = require("../models/Products");

const productsSchema = require("../data/productsShema");
// Lấy toàn bộ sản phẩm
router.get("/", async function (req, res, next) {
  try {
    const productList = await products
      .find({})
      .populate("category")
      .populate("supplier");
    console.log(productList);
    if (productList.length === 0) {
      return res.status(404).send("No products found");
    }
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).send("Error fetching products: " + error.message);
  }
});

// Tìm sản phẩm theo name và type
router.get("/search", async function (req, res, next) {
  try {
    const { name, type } = req.query;
    const query = {};
    if (name) query.name = name;
    if (type) query.type = type;
    const foundProduct = await products.find(query);
    if (foundProduct.length === 0) {
      return res.status(404).send("No products found");
    }
    res.status(200).json(foundProduct);
  } catch (error) {
    res.status(500).send("Error fetching products: " + error.message);
  }
});

// Thêm sản phẩm mới
router.post("/", async function (req, res, next) {
  try {
    await productsSchema.validate(req.body);
    const newProduct = new products(req.body);
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).send("Error adding product: " + error.message);
  }
});

// Xóa sản phẩm
router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const foundProduct = await products.findByIdAndDelete(id);
    if (!foundProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Deleted product");
  } catch (error) {
    res.status(400).send("Error deleting product: " + error.message);
  }
});

// Cập nhật sản phẩm
router.patch("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    await productsSchema.validate(req.body);
    const updatedProduct = await products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).send("Error updating product: " + error.message);
  }
});

//==> Practice
//Bài 1:
router.get("/bai1/:request", async function (req, res, next) {
  try {
    const request = req.params.request;
    let query = { discount: { $lte: request } };
    const productList = await products
      .find(query)
      .populate("categoryId")
      .populate("supplierId");
    if (productList.length === 0) {
      return res.status(404).send("No products found with discount <= 10");
    }
    res.status(200).json(productList);
  } catch (error) {
    res.status(400).send("Error updating product: " + error.message);
  }
});

module.exports = router;
