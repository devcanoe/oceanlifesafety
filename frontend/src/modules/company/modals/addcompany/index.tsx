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

export default function AddCompanyContent({ close }: IAddCompanyContent) {
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
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    email: yup.string(),
    phone: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Company) => {
      const payload = {
        address: values.address,
        name: values.name,
        phone: values.phone,
        email: values.email,
      };

      create(payload)
        .then((res: any) => {
          if (res.data.status === "success") {
            close();
            successToastHandler({
              message: res.data.message,
              visibility: true,
              status: true,
            });
          } else {
            errorToastHandler({
              message: res.data.message,
              visibility: true,
              status: false,
            });
          }
        })
        .catch((err: any) => {
          errorToastHandler({
            message: err.message,
            visibility: true,
            status: false,
          });
        });
    },
  });

  return (
    <>
      <section className={styles.container}>
        <InputField
          type={"text"}
          placeholder="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <InputField
          type={"text"}
          placeholder="Address"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />

        <InputField
          type={"text"}
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <InputField
          type={"text"}
          placeholder="Phone"
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
          label={"Add Company"}
          onClick={formik.handleSubmit}
        />
      </section>
    </>
  );
}
