const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categoriesSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, optional: true, trim: true },
});
const categories = model("Category", categoriesSchema);
module.exports = categories;
