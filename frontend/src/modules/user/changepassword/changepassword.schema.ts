import * as yup from "yup";

export const changepasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .required("Confirm password is required"),
});
