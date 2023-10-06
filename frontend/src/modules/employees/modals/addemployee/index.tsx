import Button from "@/common/components/form/button";
import InputField from "@/common/components/form/inputfield";
import styles from "./index.module.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useCreateCompanyMutation } from "@/common/services/company.service";
import { useState } from "react";
import { IHandleMotion } from "@/common/components/display/popup";
import SToast from "@/common/components/display/toast/toast";
import Company from "@/common/model/company.model";

interface IAddCompanyContent {
  close: () => void;
}

export default function AddEmployeeContent({ close }: IAddCompanyContent) {
  const [successToastStatus, setSuccessToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });
  const [errorToastStatus, setErrorToastStatus] = useState<IHandleMotion>({
    message: "",
    visibility: false,
    status: false,
  });
  const successToastHandler = (args: IHandleMotion) => {
    setSuccessToastStatus(args);
  };

  const errorToastHandler = (args: IHandleMotion) => {
    setErrorToastStatus(args);
  };

  const [create, { isLoading }] = useCreateCompanyMutation();

  const validationSchema = yup.object({
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().required("email is required"),
    phone: yup.string().required("phone is required"),
    password: yup.string().required("password is required"),
    position: yup.string().required("position is required"),
    date_of_birth: yup.date().required("dob is required"),
    date_hired: yup.date().required("date hired is required"),
    date_fired: yup.date(),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      email: "",
      phone: "",
      password: "",
      position: "",
      date_of_birth: new Date(),
      date_hired: new Date(),
      date_fired: new Date(),
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {},
  });

  return (
    <>
      <section className={styles.container}>
        <InputField
          type={"text"}
          placeholder=""
          label="First Name"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Last Name"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
        />
        <InputField
          type={"date"}
          placeholder=""
          label="Date of birth"
          name="date_of_birth"
          value={formik.values.date_of_birth}
          onChange={formik.handleChange}
          error={
            formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)
          }
          helperText={
            formik.touched.date_of_birth && formik.errors.date_of_birth
          }
        />
        <InputField
          type={"date"}
          label="Date Hired"
          placeholder=""
          name="date_hired"
          value={formik.values.date_hired}
          onChange={formik.handleChange}
          error={formik.touched.date_hired && Boolean(formik.errors.date_hired)}
          helperText={formik.touched.date_hired && formik.errors.date_hired}
        />

        <InputField
          type={"date"}
          placeholder=""
          label="Date Fired"
          name="date_fired"
          value={formik.values.date_fired}
          onChange={formik.handleChange}
          error={formik.touched.date_fired && Boolean(formik.errors.date_fired)}
          helperText={formik.touched.date_fired && formik.errors.date_fired}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <InputField
          type={"text"}
          placeholder=""
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Position"
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
          error={formik.touched.position && Boolean(formik.errors.position)}
          helperText={formik.touched.position && formik.errors.position}
        />
        <InputField
          type={"text"}
          placeholder=""
          label="Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <SToast
          text={successToastStatus.message}
          severity={"success"}
          open={successToastStatus.visibility}
          onClose={function (): void {
            setSuccessToastStatus({
              visibility: false,
            });
          }}
        />

        <SToast
          text={errorToastStatus.message}
          severity={"error"}
          open={errorToastStatus.visibility}
          onClose={function (): void {
            setErrorToastStatus({
              visibility: false,
            });
          }}
        />
        <Button
          isLoading={isLoading}
          label={"Add Employee"}
          onClick={formik.handleSubmit}
          button={"primary"}
        />
      </section>
    </>
  );
}