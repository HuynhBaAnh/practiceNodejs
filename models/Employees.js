const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  birthday: { type: Date, required: true },
});
const employees = model("Employee", employeeSchema);
module.exports = employees;
