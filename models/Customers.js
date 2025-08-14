const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
});

const customers = model("Customer", customerSchema);
module.exports = customers;
