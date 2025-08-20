import * as yup from "yup";

const categoriesSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
});
export default categoriesSchema;
