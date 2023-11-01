import * as yup from "yup";

export const editprofileValidationSchema = yup.object({
  firstname: yup
    .string()
    .required("FirstName is required"),
  lastname: yup
    .string()
    .required("LastName is required"),
  phone: yup
    .string()
    .required("Phone is required"),
  date_of_birth: yup
    .string()
    .required("Date of birth is required"),
  date_hired: yup
    .string()
    .required("Date hired is required"),
  date_fired: yup
    .string()
    .required("Date fired is required"),
  position: yup
    .string()
    .required("Position is required"),
});
