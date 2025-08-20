const yup = require("yup");

const productsSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required(),
  discount: yup.number().optional(),
  stock: yup.number().required(),
  description: yup.string().optional(),
  categoryId: yup.string().required(),
  supplierId: yup.string().required(),
});
module.exports = productsSchema;
