const yup = require("yup");

const orderSchema = yup.object().shape({
  createdDate: yup.date().required(),
  shippedDate: yup.date().optional(),
  status: yup.string().required(),
  description: yup.string().optional(),
  shippingAddress: yup.string().required(),
  shipingCity: yup.string().required(),
  paymentType: yup.string().required(),
  customerId: yup.string().required(),
  employeeId: yup.string().required(),
});
module.exports = orderSchema;
