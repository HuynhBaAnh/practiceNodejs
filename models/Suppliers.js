const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const supplierSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});
const suppliers = model("Supplier", supplierSchema);
module.exports = suppliers;
