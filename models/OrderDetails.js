const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderDetailSchema = new Schema({
  quantity: { type: Number, required: true },
  price: { type: Number },
  discount: { type: Number, optional: true },
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});
const orderDetails = model("OrderDetail", orderDetailSchema);
module.exports = orderDetails;
