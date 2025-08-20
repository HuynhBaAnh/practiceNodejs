const yup = require("yup");

const customersSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
  birthday: yup.date().required(),
});
module.exports = customersSchema;
