const yup = require("yup");

const employeeSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
  bithday: yup.date().required(),
});
module.exports = employeeSchema;
