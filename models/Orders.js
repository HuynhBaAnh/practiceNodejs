const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  createdDate: { type: Date, required: true },
  shippedDate: { type: Date },
  status: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  shippingAddress: { type: String, required: true, trim: true },
  shipingCity: { type: String, required: true, trim: true },
  paymentType: { type: String, required: true, trim: true },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
});

const orders = model("Order", orderSchema);
module.exports = orders;
