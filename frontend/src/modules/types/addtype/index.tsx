import styles from "./index.module.css";
import React, { useEffect, useState } from "react";
import Loader from "@/common/components/display/loader";
import InputField from "@/common/components/form/inputfield";
import Button from "@/common/components/form/button";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  useCreateTypeMutation,
  useGetTypeQuery,
  useUpdateTypeMutation,
} from "@/common/services/ticket.service";
import SToast from "@/common/components/display/toast/toast";
import { IHandleMotion } from "@/common/components/display/popup";

interface IAddTypeContent {
  close: () => void;
}

export default function AddtypeContent({ close }: IAddTypeContent) {
  const [create, { isLoading }] = useCreateTypeMutation();

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

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      create({
        name: values.name,
      })
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
        <Button
          isLoading={isLoading}
          label={"Add Type"}
          onClick={formik.handleSubmit}
        />
      </section>
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
    </>
  );
}

export function UpdatetypeContent({ id }: { id: number | undefined }) {
  const { data, isLoading } = useGetTypeQuery({ id: id?.toString() });

  const [updateType, { isLoading: loadingType }] = useUpdateTypeMutation();

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateType({
        id: id?.toString(),
        body: { name: values.name },
      })
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        name: data.data.name,
      });
    }
  }, [data]);
  return (
    <>
      <Loader status={isLoading} />
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
        <Button
          isLoading={loadingType}
          label={"Update Type"}
          onClick={formik.handleSubmit}
        />
      </section>
    </>
  );
}
