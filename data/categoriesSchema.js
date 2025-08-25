const yup = require('yup');
const categoriesSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
});
module.exports = categoriesSchema;
