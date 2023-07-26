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
import Ship from "@/common/model/ship.model";
import { useCreateShipMutation } from "@/common/services/ship.service";

interface IAddShipContent {
  close: () => void;
  companyId: string | undefined;
}

export default function AddShipContent({ close, companyId }: IAddShipContent) {
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

  const [create, { isLoading }] = useCreateShipMutation();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Ship) => {
      const payload = {
        name: values.name,
        company: companyId,
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
          label={"Add Ship"}
          onClick={formik.handleSubmit}
        />
      </section>
    </>
  );
}
