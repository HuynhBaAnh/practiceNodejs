const yup = require("yup");
const supplierSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
});
module.exports = supplierSchema;
