var express = require("express");
var router = express.Router();
const categories = require("../models/Categories");
const categoriesSchema = require("../data/categoriesSchema");

router.get("/", async function (req, res, next) {
  try {
    const categoryList = await categories.find({});
    console.log(categoryList);
    if (categoryList.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    res.status(200).json(categoryList);
  } catch (error) {
    console.error("Error in categories route:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async function (req, res) {
  try {
    await categoriesSchema.validate(req.body);
    const newCategory = new categories(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res
      .status(400)
      .json({ message: "Error adding category: " + error.message });
  }
});

// Delete category by ID
router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const foundCategory = await categories.findByIdAndDelete(id);
    if (!foundCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res
      .status(500)
      .json({ message: "Error deleting category: " + error.message });
  }
});

// Update category by ID
router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    await categoriesSchema.validate(req.body);
    const updatedCategory = await categories.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res
      .status(400)
      .json({ message: "Error updating category: " + error.message });
  }
});

module.exports = router;
