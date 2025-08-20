const yup = require("yup");

const orderDetailsSchema = yup.object().shape({
  orderId: yup.string().required(),
  productId: yup.string().required(),
  quantity: yup.number().required(),
  price: yup.number().required(),
  discount: yup.number().optional(),
});
module.exports = orderDetailsSchema;
