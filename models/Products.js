const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  discount: { type: Number },
  stock: { type: Number, required: true },
  description: { type: String, trim: true },
  categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
});

const products = model("Product", productSchema);
module.exports = products;
